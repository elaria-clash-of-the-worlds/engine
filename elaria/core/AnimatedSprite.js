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
        const index = this.#animations.findIndex(a => a.name === name);
        if (this.#activeAnimation === index)
        {
            this.#activeAnimation = 0;
        }
        return this.#animations.splice(index, 1);
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
        this.#animations[this.#activeAnimation].resetFramePosition();
    }

    update(dt) {
        if (this.#animationCompleted) return;

        this.#elapsedTime += dt;

        const animation = this.#animations[this.#activeAnimation];

        if (this.#elapsedTime >= animation.timeOnFrame) {
            this.#elapsedTime = 0;

            if (animation.spriteSheet.isLastFrame && !animation.looped) {
                this.#animationCompleted = true;
                if (animation.onPlayEnd != null) {
                    animation.onPlayEnd();
                }
                return;
            }

            if (animation.direction === "forward") {
                animation.nextFrame();
            } else if (animation.direction === "backward") {
                animation.prevFrame();
            }
        }
    }

    render(ctx) {
        const ise = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = !this.pixelPerfect;

        const animation = this.#animations[this.#activeAnimation];
        ctx.drawImage(
            animation.image,
            animation.framePosX,
            animation.framePosY,
            animation.frameWidth,
            animation.frameHeight,
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        ctx.imageSmoothingEnabled = ise;
    }

    clone() {
        /**@type {AnimatedSprite}*/
        const clonedAnimatedSprite = super.clone();

        clonedAnimatedSprite.#animations = this.#animations.map(animation => animation.clone());
        clonedAnimatedSprite.#elapsedTime = this.#elapsedTime;
        clonedAnimatedSprite.#activeAnimation = this.#activeAnimation;
        clonedAnimatedSprite.#animationCompleted = this.#animationCompleted;

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

    get frameWidth() {
        return this.spriteSheet.frameWidth;
    }

    get frameHeight() {
        return this.spriteSheet.frameHeight;
    }

    get framePosX() {
        return this.spriteSheet.framePosX;
    }

    get framePosY() {
        return this.spriteSheet.framePosY;
    }

    /**
     * @param {string} name - animation name
     * @param {string} imageSource - path to image for animation
     * @param {import("./SpriteSheet.js").default} spriteSheet - sprite sheet for animation
     * @param {number} timeOnFrame - time for show one frame
     * @param {string} direction - animation direction (forward | backward)
     * @param {boolean} looped - is animation looped
     */
    constructor(name, imageSource, spriteSheet, timeOnFrame, direction, looped) {
        this.name = name;
        this.imageSource = imageSource;
        this.spriteSheet = spriteSheet;
        this.timeOnFrame = timeOnFrame || 0.1;
        this.direction = direction || "forward";
        this.looped = looped || false;
    }

    resetFramePosition() {
        this.spriteSheet.resetFramePosition();
    }

    prevFrame() {
        this.spriteSheet.prevFrame();
    }

    nextFrame() {
        this.spriteSheet.nextFrame();
    }

    clone() {
        const clonedAnimation = new Animation(
            this.name,
            this.imageSource,
            this.spriteSheet.clone(),
            this.timeOnFrame,
            this.direction,
            this.looped
        );
        clonedAnimation.onPlayEnd = this.onPlayEnd;
        return clonedAnimation;
    }
}
