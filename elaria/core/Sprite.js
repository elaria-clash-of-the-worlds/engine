import Component from "./Component.js";

export default class Sprite extends Component {
    #image = new Image();
    #pixelPerfect = false;

    get image() {
        return this.#image;
    }

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

    get pixelPerfect() {
        return this.#pixelPerfect;
    }

    set pixelPerfect(value) {
        this.#pixelPerfect = value;
    }

    clone() {
        const clonedSprite = super.clone();
        clonedSprite.imageSource = this.imageSource;
        clonedSprite.width = this.width;
        clonedSprite.height = this.height;
        return clonedSprite;
    }

    render(ctx) {
        const ise = ctx.imageSmoothingEnabled;
        ctx.imageSmoothingEnabled = !this.pixelPerfect;

        ctx.drawImage(this.#image,  -this.width / 2, -this.height / 2, this.width, this.height);

        ctx.imageSmoothingEnabled = ise;
    }
}