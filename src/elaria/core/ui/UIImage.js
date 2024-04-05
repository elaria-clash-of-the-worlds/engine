import Graphic from "./Graphic.js";

export default class UIImage extends Graphic {
    #image = new Image();

    get imageSource() {
        return this.#image.src;
    }

    set imageSource(imageSource) {
        this.#image.src = imageSource;
    }

    draw(ctx, x, y, w, h) {
        if (this.imageSource == null || this.imageSource === "")
        {
            ctx.fillRect(x, y, w, h);
        }
        else {
            ctx.drawImage(this.#image, x, y, w, h);
        }
    }

    clone() {
        const clonedUIImage = super.clone();
        clonedUIImage.imageSource = this.imageSource;
        return clonedUIImage;
    }
}