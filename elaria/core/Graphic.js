import Component from "./Component.js";
import ElariaGame from "./ElariaGame.js";

class Graphic extends Component {
    constructor() {
        super();
        this.context = ElariaGame.canvas.getContext("2d");
    }
}

export default Graphic;