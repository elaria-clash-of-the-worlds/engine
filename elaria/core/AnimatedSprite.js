import Sprite from "./Sprite.js";

export default class AnimatedSprite extends Sprite {
    #elapsedTime = 0;
    #activeAnimation = 0;
    #animationCompleted = false;

    /**@type {Array<Animation>}*/
    #animations = [];

    /**
     * @param {Animation} animation - animation for play
     */
    addAnimation(animation) {
        this.#animations.push(animation);
    }

    removeAnimation(name) {
        return this.#animations.splice(this.#animations.find(a => a.name === name), 1);
    }

    playAnimation(name) {
        const index = this.#animations.findIndex(a => a.name === name);

        if (index === -1) {
            console.log(`Animation by name ${name} doesn't exist`);
            return;
        }

        this.#activeAnimation = index;
        this.#elapsedTime = 0;
        this.#animationCompleted = false;
    }

    update(dt) {
        if (this.#animationCompleted) return;

        this.#elapsedTime += dt;

        const animation = this.#animations[this.#activeAnimation];

        if (this.#elapsedTime > animation.timeForFrame) {
            this.#elapsedTime = 0;

            if (animation.spriteSheet.isLastFrame && !animation.looped)
            {
                this.#animationCompleted = true;
                if (animation.onPlayEnd != null) {
                    animation.onPlayEnd();
                }
                return;
            }

            if (animation.direction === "forward")
            {
                animation.spriteSheet.nextFrame();
            }
            else if (animation.direction === "backward")
            {
                animation.spriteSheet.prevFrame();
            }
        }
    }

    render(ctx) {
        const ise = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = !this.pixelPerfect;

        const animation = this.#animations[this.#activeAnimation];
        ctx.drawImage(
            animation.image,
            animation.spriteSheet.framePosX,
            animation.spriteSheet.framePosY,
            animation.spriteSheet.frameWidth,
            animation.spriteSheet.frameHeight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.imageSmoothingEnabled = ise;
    }

    clone() {
        const clonedAnimatedSprite = super.clone();
        return clonedAnimatedSprite;
    }
}

export class Animation {
    /**@type {function}*/
    onPlayEnd = null;
    #image = null;

    get image() {
        return this.#image;
    }

    get imageSource() {
        return this.#image.src;
    }

    set imageSource(value) {
        if (this.#image == null) {
            this.#image = new Image();
        }
        this.#image.src = value;
    }

    /**
     * @param {string} name - animation name
     * @param {string} imageSource - path to image for animation
     * @param {import("./SpriteSheet.js").default} spriteSheet - sprite sheet for animation
     * @param {number} timeForFrame - time for show one frame
     * @param {string} direction - animation direction (forward | backward)
     * @param {boolean} looped - is animation looped
     */
    constructor(name, imageSource, spriteSheet, timeForFrame = 0.1, direction = "forward", looped = false) {
        this.name = name;
        this.imageSource = imageSource;
        this.spriteSheet = spriteSheet;
        this.timeForFrame = timeForFrame;
        this.direction = direction;
        this.looped = looped;
    }
}
