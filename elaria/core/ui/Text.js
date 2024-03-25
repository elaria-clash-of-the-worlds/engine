import Graphic from "./Graphic.js";

export default class Text extends Graphic {
    #text = "";
    #font = "16px Arial";
    #horizontalAlign = "center";
    #verticalAlign = "center";

    constructor() {
        super();
        super.color = "black";
        super.virtualContext.font = this.#font;
        super.virtualContext.textAlign = this.#horizontalAlign;
        super.virtualContext.textBaseline = this.#verticalAlign === "center" ? "middle" : this.#verticalAlign;
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

    render(ctx) {
        const rt = this.transform;

        const w = rt.width;
        const h = rt.height;

        this.virtualCanvas.width = w;
        this.virtualCanvas.height = h;

        this.virtualContext.fillStyle = this.color;
        this.virtualContext.font = this.font;
        this.virtualContext.textAlign = this.#horizontalAlign;
        this.virtualContext.textBaseline = this.#verticalAlign === "center" ? "middle" : this.#verticalAlign;

        const x = this.#horizontalAlign === "left" ? 0 : (this.#horizontalAlign === "center" ? w / 2 : w);
        const y = this.#verticalAlign === "top" ? 0 : (this.#verticalAlign === "center" ? h / 2 : h);
        this.virtualContext.fillText(this.#text, x, y, w);

        ctx.drawImage(this.virtualCanvas, -rt.pivot.x * w, -rt.pivot.y * h);
    }
}