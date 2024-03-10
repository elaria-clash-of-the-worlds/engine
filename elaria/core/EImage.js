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
        ctx.save();

        ctx.fillStyle = this.gameObject.name;
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = "black";
        ctx.fillRect(x - 5, y - 5, 10, 10);

        ctx.drawImage(this.#image, x, y, w, h);

        ctx.restore();
    }
}