import Component from "./Component.js";
import ElariaGame from "./ElariaGame.js";

class Graphic extends Component {
    #context;
    constructor() {
        super();
        this.#context = ElariaGame.canvas.getContext("2d");
    }
    get context()
    {
        return this.#context;
    }
}

export default Graphic;