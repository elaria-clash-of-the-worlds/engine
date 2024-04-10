import Component from "../core/Component.js";

export default class WorldText extends Component {
    constructor() {
        super();
        this.text = "";
        this.fontSize = 18;
        this.fontFamily = "serif";
    }

    render(ctx) {
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        ctx.fillText(this.text, 0, 0);
        ctx.restore();
    }

    clone() {
        const cloneWorldText = super.clone();
        cloneWorldText.text = this.text;
        cloneWorldText.fontSize = this.fontSize;
        cloneWorldText.fontFamily = this.fontFamily;
        return cloneWorldText;
    }
}