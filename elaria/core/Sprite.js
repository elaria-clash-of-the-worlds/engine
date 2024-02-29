import Graphic from "./Graphic.js";

export default class Sprite extends Graphic {
    #image = new Image();

    set imageSource(imageSource) {
        this.#image.src = imageSource;
    }

    get image() {
        return this.#image.src;
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

    render() {
        this.context.drawImage(this.#image,  -this.#image.width / 2, -this.#image.height / 2, this.#image.width, this.#image.height);
    }
}