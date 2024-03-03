import Component from "./Component.js";
import GameObject from "./GameObject.js";
import {Vector2D} from "./ElariaCore.js";

class Tween {
    #startValue;
    #endValue;
    #t = 0;
    #duration = 0;
    #delay = 0;
    #loopCount = 0;
    #loopType = LoopType.restart;
    #lerpFunction = Tween.lerpNumberFunction;
    #easeFunction = Ease.linear;
    #bindProperty;
    #onStartCallback;
    #onCompleteCallback;

    #currentValue;
    #elapsedTime = 0;
    #loopsLeft;
    #isRewind = false;
    #isStarted = false;
    #isPlaying = false;

    static #tweensContainer;

    /**
     * Creates a new tween which can be used to interpolate a value from a one value to another.
     *
     * @param {number | Vector2D} startValue - the starting value
     * @param {number | Vector2D} endValue - the ending value
     * @param {number} duration - the duration of the interpolation
     * @return {Tween}
     */
    static create(startValue, endValue, duration) {
        if (startValue == null) {
            throw new Error("From is required");
        }
        if (endValue == null) {
            throw new Error("To is required");
        }
        if (duration == null) {
            throw new Error("Duration is required");
        }
        if (duration < 0) {
            throw new Error("Duration must be a non-negative value.");
        }
        if (typeof startValue !== typeof endValue) {
            throw new Error("From and To must have the same type");
        }

        const tween = new Tween();
        tween.#startValue = startValue;
        tween.#endValue = endValue;
        tween.#currentValue = startValue;
        tween.#duration = duration;
        tween.#isPlaying = true;

        if (startValue instanceof Vector2D) {
            tween.#lerpFunction = this.lerpVector2DFunction;
        }

        if (!Tween.#tweensContainer || Tween.#tweensContainer.gameObject.isDestroyed) {
            Tween.#tweensContainer = new GameObject("TweensContainer").addComponent(TweensContainer);
        }

        Tween.#tweensContainer.registerTween(tween);

        return tween;
    }

    get isComplete() {
        return this.#t === 1;
    }

    /**
     * Resumes playing the tween from the current state.
     */
    play() {
        this.#isPlaying = true;
    }

    /**
     * Pauses the tween at its current state.
     */
    pause() {
        this.#isPlaying = false;
    }

    /**
     * Resets the tween to its initial state, stopping it if playing.
     */
    reset() {
        this.#t = 0;
        this.#elapsedTime = 0;
        this.#loopsLeft = this.#loopCount === -1 ? 0 : this.#loopCount;
        this.#isRewind = false;
        this.#isStarted = false;
        this.pause();
    }

    /**
     * Binds the tween to a property setter function.
     * @param {function} setter - The property setter function to bind the tween to.
     * @returns {Tween} - The current Tween instance for method chaining.
     */
    bindTo(setter) {
        this.#bindProperty = setter;
        return this;
    }

    /**
     * Sets the delay before the tween starts playing.
     * @param {number} delay - The delay in seconds (non-negative).
     * @param {boolean} applyImmediate - Apply from value immeadiate or not
     * @returns {Tween} - The current Tween instance for method chaining.
     */
    setDelay(delay, applyImmediate = true) {
        if (delay >= 0) {
            this.#delay = delay;
        }
        if (applyImmediate) {
            if (this.#bindProperty)
            {
                this.#bindProperty(this.#startValue);
            }
        }
        return this;
    }

    /**
     * Sets the starting value of the tween.
     * @param {number|Vector2D} from - The starting value.
     * @returns {Tween} - The current Tween instance for method chaining.
     */
    setFrom(from) {
        if (from) {
            this.#startValue = from;
        }
        return this;
    }

    /**
     * Sets the easing function for the tween.
     * @param {function} easeFunction - The easing function for interpolation.
     * @returns {Tween} - The current Tween instance for method chaining.
     */
    setEase(easeFunction) {
        if (easeFunction) {
            this.#easeFunction = easeFunction;
        } else {
            console.log("Ease function is invalid. Linear is used by default.");
            this.#easeFunction = Ease.linear;
        }
        return this;
    }

    /**
     * Sets the number of loops and the loop type for the tween.
     * @param {number} loopCount - The number of loops (use -1 for infinite loops).
     * @param {LoopType} loopType - The type of looping behavior (see LoopType enum).
     * @returns {Tween} - The current Tween instance for method chaining.
     */
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

    /**
     * Sets a custom interpolation function for the tween.
     * @param {function} lerpFunction - The custom interpolation function.
     * @throws {Error} - Throws an error if lerpFunction is not a function.
     * @returns {Tween} - The current Tween instance for method chaining.
     */
    setLerpFunction(lerpFunction) {
        if (typeof lerpFunction !== "function") {
            throw new Error("Lerp function must be a function");
        }

        this.#lerpFunction = lerpFunction;

        return this;
    }

    /**
     * Sets a callback function to be executed when the tween starts.
     * @param {function} callback - The callback function to be executed on tween start.
     * @returns {Tween} - The current Tween instance for method chaining.
     */
    onStart(callback) {
        this.#onStartCallback = callback;
        return this;
    }

    /**
     * Sets a callback function to be executed when the tween completes.
     * @param {function} callback - The callback function to be executed on tween completion.
     * @returns {Tween} - The current Tween instance for method chaining.
     */
    onComplete(callback) {
        this.#onCompleteCallback = callback;
        return this;
    }

    update(dt) {
        if (!this.#isPlaying) return;

        this.#elapsedTime += dt;
        if (this.#elapsedTime >= this.#delay) {
            if (!this.#isStarted) {
                this.#isStarted = true;
                if (this.#onStartCallback) {
                    this.#onStartCallback();
                }
            }

            this.#t = Math.min(Math.max((this.#elapsedTime - this.#delay) / this.#duration, 0), 1);
            this.#currentValue = this.#lerpFunction(this.#startValue, this.#endValue, this.#easeFunction(this.#isRewind ? 1 - this.#t : this.#t));

            if (this.#bindProperty)
                this.#bindProperty(this.#currentValue);

            if (this.#t === 1) {
                if (this.#loopCount === -1 || this.#loopsLeft > 0) {
                    if (this.#loopsLeft > 0) {
                        this.#loopsLeft -= 1;
                    }

                    if (this.#loopType === LoopType.restart) {
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    } else if (this.#loopType === LoopType.pingPong) {
                        const temp = this.#startValue;
                        this.#startValue = this.#endValue;
                        this.#endValue = temp;
                        this.#t = 0;
                        this.#elapsedTime = this.#delay;
                    } else if (this.#loopType === LoopType.incremental) {
                        const delta = this.#endValue - this.#startValue;
                        this.#startValue = this.#endValue;
                        this.#endValue += delta;
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


    static lerpNumberFunction(a, b, t) {
        return t * (b - a) + a;
    }

    static lerpVector2DFunction(v1, v2, t) {
        const lerpedX = v1.x + (v2.x - v1.x) * t;
        const lerpedY = v1.y + (v2.y - v1.y) * t;
        return new Vector2D(lerpedX, lerpedY);
    }

    static delay(duration) {
        return Tween.create(0, 1, duration);
    }

    static position(transform, startValue, endValue, duration) {
        return Tween.create(startValue, endValue, duration).bindTo((value) => transform.position = value);
    }

    static positionX(transform, startValue, endValue, duration) {
        return Tween.create(startValue, endValue, duration).bindTo((value) => transform.positionX = value);
    }

    static positionY(transform, startValue, endValue, duration) {
        return Tween.create(startValue, endValue, duration).bindTo((value) => transform.positionY = value);
    }

    static localPosition(transform, startValue, endValue, duration) {
        return Tween.create(startValue, endValue, duration).bindTo((value) => transform.localPosition = value);
    }

    static localPositionX(transform, startValue, endValue, duration) {
        return Tween.create(startValue, endValue, duration).bindTo((value) => transform.localPositionX = value);
    }

    static localPositionY(transform, startValue, endValue, duration) {
        return Tween.create(startValue, endValue, duration).bindTo((value) => transform.localPositionY = value);
    }

    static localRotation(transform, startValue, endValue, duration) {
        return Tween.create(startValue, endValue, duration).bindTo((value) => transform.localRotation = value);
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