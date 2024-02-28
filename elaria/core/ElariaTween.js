import Component from "./Component.js";
import GameObject from "./GameObject.js";

class Tween {
    #from;
    #to;
    #t = 0;
    #duration = 0;
    #delay = 0;
    #bindProperty;
    #loopCount = 0;
    #loopType = LoopType.restart;
    #onCompleteCallback;
    #easeFunction = Ease.linear;

    #value;
    #elapsedTime = 0;
    #loopsLeft;
    #isRewind = false;

    static #tweensContainer;

    /**
     * Creates a new tween which can be used to interpolate a value from a one value to another.
     *
     * @param {number} from - the starting value
     * @param {number} to - the ending value
     * @param {number} duration - the duration of the interpolation
     * @return {Tween}
     */
    static create(from, to, duration) {
        if (from == null) {
            throw new Error("From is required");
        }
        if (to == null) {
            throw new Error("To is required");
        }
        if (duration == null) {
            throw new Error("Duration is required");
        }

        const tween = new Tween();
        tween.#from = from;
        tween.#to = to;
        tween.#value = from;
        tween.#duration = duration;

        if (!Tween.#tweensContainer || Tween.#tweensContainer.gameObject.isDestroyed) {
            Tween.#tweensContainer = new GameObject("TweensContainer").addComponent(TweensContainer);
        }

        Tween.#tweensContainer.registerTween(tween);

        return tween;
    }

    get isComplete() {
        return this.#t === 1;
    }

    bindTo(setter) {
        this.#bindProperty = setter;
        return this;
    }

    setDelay(delay) {
        if (delay >= 0) {
            this.#delay = delay;
        }
        return this;
    }

    setFrom(from) {
        if (from) {
            this.#from = from;
        }
        return this;
    }

    setEase(easeFunction) {
        if (easeFunction) {
            this.#easeFunction = easeFunction;
        } else {
            console.log("Ease function is invalid. Linear is used by default.");
            this.#easeFunction = Ease.linear;
        }
        return this;
    }

    setLoops(loopCount, loopType) {
        if (loopCount) {
            this.#loopCount = loopCount;
            this.#loopsLeft = this.#loopCount === -1 ? 0 : loopCount;
        }
        if (loopType) {
            this.#loopType = loopType;
            this.#isRewind = false;
        }
        return this;
    }

    onComplete(callback) {
        this.#onCompleteCallback = callback;
        return this;
    }

    update(dt) {
        this.#elapsedTime += dt;
        if (this.#elapsedTime >= this.#delay) {
            this.#t = Math.min(Math.max((this.#elapsedTime - this.#delay) / this.#duration, 0), 1);
            this.#value = this.#easeFunction(this.#isRewind ? 1 - this.#t : this.#t) * (this.#to - this.#from) + this.#from;

            if (this.#bindProperty)
                this.#bindProperty(this.#value);

            if (this.#t === 1) {
                if (this.#loopCount === -1 || this.#loopsLeft > 0) {
                    if (this.#loopsLeft > 0) {
                        this.#loopsLeft -= 1;
                    }

                    if (this.#loopType === LoopType.restart)
                    {
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    }
                    else if (this.#loopType === LoopType.pingPong)
                    {
                        const temp = this.#from;
                        this.#from = this.#to;
                        this.#to = temp;
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    }
                    else if (this.#loopType === LoopType.incremental)
                    {
                        const delta = this.#to - this.#from;
                        this.#from = this.#to;
                        this.#to += delta;
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    }
                    else if (this.#loopType === LoopType.rewind)
                    {
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                        this.#isRewind = !this.#isRewind;
                    }
                } else if (this.#onCompleteCallback) {
                    this.#onCompleteCallback();
                }
            }
        }
    }

    static positionX(transform, from, to, duration) {
        return Tween.create(from, to, duration).bindTo((value) => transform.positionX = value);
    }

    static positionY(transform, from, to, duration) {
        return Tween.create(from, to, duration).bindTo((value) => transform.positionY = value);
    }

    static localPositionX(transform, from, to, duration) {
        return Tween.create(from, to, duration).bindTo((value) => transform.localPositionX = value);
    }

    static localPositionY(transform, from, to, duration) {
        return Tween.create(from, to, duration).bindTo((value) => transform.localPositionY = value);
    }
}

class TweensContainer extends Component {
    #tweens;

    constructor() {
        super();
        this.#tweens = [];
    }

    update(dt) {
        for (const tween of this.#tweens) {
            tween.update(dt);
            if (tween.isComplete) {
                this.#tweens.splice(this.#tweens.indexOf(tween), 1);
            }
        }
    }

    registerTween(tween) {
        this.#tweens.push(tween);
    }
}

const LoopType = Object.freeze({
    restart: 0,
    pingPong: 1,
    incremental: 2,
    rewind: 3
});

class Ease {
    static linear = (t) => t;
    static inSine = (t) => 1 - Math.cos((t * Math.PI) / 2);
    static outSine = (t) => Math.sin((t * Math.PI) / 2);
    static inOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;
    static inQuad = (t) => t * t;
    static outQuad = (t) => t * (2 - t);
    static inOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    static inCubic = (t) => t * t * t;
    static outCubic = (t) => 1 - Math.pow(1 - t, 3);
    static inOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    static inQuart = (t) => t * t * t * t;
    static outQuart = (t) => 1 - Math.pow(1 - t, 4);
    static inOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    static inQuint = (t) => t * t * t * t * t;
    static outQuint = (t) => 1 - Math.pow(1 - t, 5);
    static inOutQuint = (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
    static inExpo = (t) => Math.pow(2, 10 * (t - 1));
    static outExpo = (t) => 1 - Math.pow(2, -10 * t);
    static inOutExpo = (t) => {
        return t === 0 || t === 1
            ? t
            : t < 0.5
                ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2;
    };
    static inCirc = (t) => 1 - Math.sqrt(1 - t * t);
    static outCirc = (t) => Math.sqrt(1 - Math.pow(t - 1, 2));
    static inOutCirc = (t) => {
        return t < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    };
    static inBack = (t) => 2.70158 * t * t * t - 1.70158 * t * t;
    static outBack = (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
    static inOutBack = (t) => {
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((2.5949095 + 1) * 2 * t - 2.5949095)) / 2
            : (Math.pow(2 * t - 2, 2) * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) / 2;
    };
    static inBounce = (t) => 1 - Ease.outBounce(1 - t);
    static outBounce = (t) => {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    };
    static inOutBounce = (t) => t < 0.5 ? (1 - Ease.outBounce(1 - 2 * t)) / 2 : (1 + Ease.outBounce(2 * t - 1)) / 2;
    static inElastic = (t) => 1 - Ease.outElastic(1 - t);
    static outElastic = (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    };
    static inOutElastic = (t) => t < 0.5 ? (1 - Ease.outElastic(1 - 2 * t)) / 2 : (1 + Ease.outElastic(2 * t - 1)) / 2;
}

export {Tween, Ease, LoopType};