import Component from "./Component.js";
import Game from "./Game.js";

class Graphic extends Component {
    #context;
    constructor() {
        super();
        this.#context = Game.canvas.getContext("2d");
    }
    get context()
    {
        return this.#context;
    }
}

export default Graphic;