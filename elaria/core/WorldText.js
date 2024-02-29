import Component from "./Component.js";
import ElariaGame from "./ElariaGame.js";

class WorldText extends Component {
    #ctx;

    constructor() {
        super();
        this.text = "";
        this.fontSize = 18;
        this.fontFamily = "serif";
    }

    awake() {
        this.#ctx = ElariaGame.canvas.getContext("2d");
    }

    render() {
        this.#ctx.fillStyle = "green";
        this.#ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        this.#ctx.fillText(this.text, this.transform.position.x, this.transform.position.y);
    }
}

export default WorldText;