import Graphic from "./Graphic.js";

export default class EImage extends Graphic {
    #image = new Image();

    get imageSource() {
        return this.#image.src;
    }

    set imageSource(imageSource) {
        this.#image.src = imageSource;
    }

    draw(ctx, x, y, w, h) {
        ctx.drawImage(this.#image, x, y, w, h);
    }
}