import Graphic from "./Graphic.js";

export default class Text extends Graphic {
    #text = "";
    #font = "16px Arial";
    #color = "black";
    #horizontalAlign = "center";
    #verticalAlign = "center";
    #baseline = "middle";

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

    get color() {
        return this.#color;
    }

    set color(color) {
        this.#color = color;
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

    get baseline() {
        return this.#baseline;
    }

    set baseline(baseline) {
        this.#baseline = baseline;
    }

    draw(ctx, x, y, w, h) {
        ctx.save();
        ctx.font = this.#font;
        ctx.fillStyle = this.#color;
        ctx.textBaseline = this.#baseline;
        ctx.textAlign = this.#horizontalAlign;
        x = this.#horizontalAlign === "left" ? x : (this.#horizontalAlign === "center" ? x + w / 2 : x + w);
        y = this.#verticalAlign === "top" ? y : (this.#verticalAlign === "center" ? y + h / 2 : y + h);
        ctx.fillText(this.#text, x, y, w);
        ctx.restore();
    }
}