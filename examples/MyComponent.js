import Component from "../core/Component.js";

class MyComponent extends Component {

    constructor() {
        super();
        this.name = "";
    }

    Awake() {
        console.log("Amongus!");
    }
}

export default MyComponent;