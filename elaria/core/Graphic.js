import Component from "./Component.js";
import RectTransform from "./RectTransform.js";

export default class Graphic extends Component {
    #color = "rgba(255, 255, 255, 255)";
    #tintColor = "rgba(255, 255, 255, 255)";
    #pixelPerfect = false;
    #graphicCanvas;

    constructor() {
        super();
        this.#graphicCanvas = document.createElement("canvas");
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

        this.#graphicCanvas.width = w;
        this.#graphicCanvas.height = h;

        const thisContext = this.#graphicCanvas.getContext("2d");

        thisContext.clearRect(0, 0, w, h);
        thisContext.save();

        thisContext.imageSmoothingEnabled = !this.#pixelPerfect;

        thisContext.fillStyle = this.color;
        this.draw(thisContext, 0, 0, w, h);

        thisContext.globalCompositeOperation = "multiply";
        thisContext.fillRect(0, 0, w, h);

        if (this.tintColor != null)
        {
            thisContext.fillStyle = this.tintColor;
            thisContext.fillRect(0, 0, w, h);
        }

        thisContext.globalCompositeOperation = "destination-in";
        this.draw(thisContext, 0, 0, w, h);

        thisContext.restore();

        ctx.drawImage(this.#graphicCanvas, -w * rt.pivot.x, -h * rt.pivot.y, w, h);
    }
}