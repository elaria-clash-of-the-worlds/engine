import Graphic from "./Graphic.js";

export default class Sprite extends Graphic {
    #image = new Image();

    get imageSource() {
        return this.#image.src;
    }

    set imageSource(imageSource) {
        this.#image.src = imageSource;
    }

    get width() {
        return this.#image.width;
    }

    set width(newWidth) {
        this.#image.width = newWidth;
    }

    get height() {
        return this.#image.height;
    }

    set height(newHeight) {
        this.#image.height = newHeight;
    }

    clone() {
        const clonedSprite = super.clone();
        clonedSprite.imageSource = this.imageSource;
        clonedSprite.width = this.width;
        clonedSprite.height = this.height;
        return clonedSprite;
    }

    render() {
        this.context.drawImage(this.#image,  -this.width / 2, -this.height / 2, this.width, this.height);
    }
}