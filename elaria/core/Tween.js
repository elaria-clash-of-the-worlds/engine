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
    #onStartCallback;
    #onCompleteCallback;
    #easeFunction = Ease.linear;

    #value;
    #elapsedTime = 0;
    #loopsLeft;
    #isRewind = false;
    #isStarted = false;

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

    onStart(callback) {
        this.#onStartCallback = callback;
        return this;
    }

    onComplete(callback) {
        this.#onCompleteCallback = callback;
        return this;
    }

    update(dt) {
        this.#elapsedTime += dt;
        if (this.#elapsedTime >= this.#delay) {
            if (!this.#isStarted)
            {
                this.#isStarted = true;
                if (this.#onStartCallback)
                {
                    this.#onStartCallback();
                }
            }

            this.#t = Math.min(Math.max((this.#elapsedTime - this.#delay) / this.#duration, 0), 1);
            this.#value = this.#easeFunction(this.#isRewind ? 1 - this.#t : this.#t) * (this.#to - this.#from) + this.#from;

            if (this.#bindProperty)
                this.#bindProperty(this.#value);

            if (this.#t === 1) {
                if (this.#loopCount === -1 || this.#loopsLeft > 0) {
                    if (this.#loopsLeft > 0) {
                        this.#loopsLeft -= 1;
                    }

                    if (this.#loopType === LoopType.restart) {
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    } else if (this.#loopType === LoopType.pingPong) {
                        const temp = this.#from;
                        this.#from = this.#to;
                        this.#to = temp;
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    } else if (this.#loopType === LoopType.incremental) {
                        const delta = this.#to - this.#from;
                        this.#from = this.#to;
                        this.#to += delta;
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    } else if (this.#loopType === LoopType.rewind) {
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

    static localRotation(transform, from, to, duration)
    {
        return Tween.create(from, to, duration).bindTo((value) => transform.localRotation = value);
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

const Ease = Object.freeze({
    linear: (t) => t,
    inSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
    outSine: (t) => Math.sin((t * Math.PI) / 2),
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    inQuad: (t) => t * t,
    outQuad: (t) => t * (2 - t),
    inOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    inCubic: (t) => t * t * t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    inQuart: (t) => t * t * t * t,
    outQuart: (t) => 1 - Math.pow(1 - t, 4),
    inOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
    inQuint: (t) => t * t * t * t * t,
    outQuint: (t) => 1 - Math.pow(1 - t, 5),
    inOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
    inExpo: (t) => Math.pow(2, 10 * (t - 1)),
    outExpo: (t) => 1 - Math.pow(2, -10 * t),
    inOutExpo: (t) => {
        return t === 0 || t === 1
            ? t
            : t < 0.5
                ? Math.pow(2, 20 * t - 10) / 2
                : (2 - Math.pow(2, -20 * t + 10)) / 2;
    },
    inCirc: (t) => 1 - Math.sqrt(1 - t * t),
    outCirc: (t) => Math.sqrt(1 - Math.pow(t - 1, 2)),
    inOutCirc: (t) => {
        return t < 0.5
            ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
            : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
    },
    inBack: (t) => 2.70158 * t * t * t - 1.70158 * t * t,
    outBack: (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2),
    inOutBack: (t) => {
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((2.5949095 + 1) * 2 * t - 2.5949095)) / 2
            : (Math.pow(2 * t - 2, 2) * ((2.5949095 + 1) * (t * 2 - 2) + 2.5949095) + 2) / 2;
    },
    inBounce: (t) => 1 - Ease.outBounce(1 - t),
    outBounce: (t) => {
        if (t < 1 / 2.75) {
            return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
            return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
            return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
            return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
    },
    inOutBounce: (t) => t < 0.5 ? (1 - Ease.outBounce(1 - 2 * t)) / 2 : (1 + Ease.outBounce(2 * t - 1)) / 2,
    inElastic: (t) => 1 - Ease.outElastic(1 - t),
    outElastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    },
    inOutElastic: (t) => t < 0.5 ? (1 - Ease.outElastic(1 - 2 * t)) / 2 : (1 + Ease.outElastic(2 * t - 1)) / 2
});

export {Tween, Ease, LoopType};