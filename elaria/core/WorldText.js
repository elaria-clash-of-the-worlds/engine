import Graphic from "./Graphic.js";

export default class WorldText extends Graphic {
    constructor() {
        super();
        this.text = "";
        this.fontSize = 18;
        this.fontFamily = "serif";
    }

    render() {
        this.context.save();
        this.context.font = `${this.fontSize}px ${this.fontFamily}`;
        this.context.fillText(this.text, 0, 0);
        this.context.restore();
    }

    clone() {
        const cloneWorldText = super.clone();
        cloneWorldText.text = this.text;
        cloneWorldText.fontSize = this.fontSize;
        cloneWorldText.fontFamily = this.fontFamily;
        return cloneWorldText;
    }
}