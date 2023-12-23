import SceneDescription from "../core/SceneDescription.js";
import MyComponent from "./MyComponent.js";

class ExampleLevel1 extends SceneDescription {
    constructor () {
        super();
    }

    build () {
        const player = this.createGameObject();
        const myComponent = player.addComponent(MyComponent);
    }
}

export default ExampleLevel1;
