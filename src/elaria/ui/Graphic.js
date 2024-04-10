import Component from "../core/Component.js";
import RectTransform from "../core/RectTransform.js";

export default class Graphic extends Component {
    #color = "rgba(255, 255, 255, 255)";
    #tintColor = "rgba(255, 255, 255, 255)";
    #pixelPerfect = false;
    #virtualCanvas;
    #virtualContext;

    get virtualCanvas() {
        return this.#virtualCanvas;
    }

    get virtualContext() {
        return this.#virtualContext;
    }

    constructor() {
        super();
        this.#virtualCanvas = document.createElement("canvas");
        this.#virtualContext = this.#virtualCanvas.getContext("2d");
    }

    get color() {
        return this.#color;
    }

    set color(value) {
        this.#color = value;
    }

    get tintColor() {
        return this.#tintColor;
    }

    set tintColor(value) {
        this.#tintColor = value;
    }

    get pixelPerfect() {
        return this.#pixelPerfect;
    }

    set pixelPerfect(value) {
        this.#pixelPerfect = value;
    }

    awake() {
        if (this.gameObject.getComponent(RectTransform) == null) {
            throw new Error("Can't find RectTransform on GameObject. When creating new GameObject use withTransform boolean flag!");
        }
    }

    // eslint-disable-next-line no-unused-vars
    draw(ctx, x, y, w, h) {
    }

    render(ctx) {
        const rt = this.transform;
        const w = rt.width;
        const h = rt.height;

        this.#virtualCanvas.width = w;
        this.#virtualCanvas.height = h;

        this.#virtualContext.imageSmoothingEnabled = !this.#pixelPerfect;
        this.#virtualContext.fillStyle = this.color;
        this.draw(this.#virtualContext, 0, 0, w, h);

        this.#virtualContext.globalCompositeOperation = "multiply";
        this.#virtualContext.fillRect(0, 0, w, h);

        if (this.tintColor != null)
        {
            this.#virtualContext.fillStyle = this.tintColor;
            this.#virtualContext.fillRect(0, 0, w, h);
        }

        this.#virtualContext.globalCompositeOperation = "destination-in";
        this.draw(this.#virtualContext, 0, 0, w, h);

        ctx.drawImage(this.#virtualCanvas, -w * rt.pivot.x, -h * rt.pivot.y, w, h);
    }
}