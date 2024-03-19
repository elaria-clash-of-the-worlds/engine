import Graphic from "./Graphic.js";

export default class Text extends Graphic {
    #text = "";
    #font = "16px Arial";
    #horizontalAlign = "center";
    #verticalAlign = "center";

    constructor() {
        super();
        super.color = "black";
    }

    get text() {
        return this.#text;
    }

    set text(text) {
        this.#text = text;
    }

    get font() {
        return this.#font;
    }

    set font(font) {
        this.#font = font;
    }

    get horizontalAlign() {
        return this.#horizontalAlign;
    }

    set horizontalAlign(alignment) {
        this.#horizontalAlign = alignment;
    }

    get verticalAlign() {
        return this.#verticalAlign;
    }

    set verticalAlign(value) {
        this.#verticalAlign = value;
    }

    draw(ctx, x, y, w, h) {
        ctx.save();
        ctx.font = this.#font;
        ctx.textBaseline = this.#verticalAlign === "center" ? "middle" : this.#verticalAlign;
        ctx.textAlign = this.#horizontalAlign;
        x = this.#horizontalAlign === "left" ? x : (this.#horizontalAlign === "center" ? x + w / 2 : x + w);
        y = this.#verticalAlign === "top" ? y : (this.#verticalAlign === "center" ? y + h / 2 : y + h);
        ctx.fillText(this.#text, x, y, w);
        ctx.restore();
    }
}