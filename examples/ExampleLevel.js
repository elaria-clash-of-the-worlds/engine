import SceneDescription from "../core/SceneDescription.js";
import GameObject from "../core/GameObject.js";
import MyComponent from "./MyComponent.js";

class ExampleLevel extends SceneDescription {
    constructor () {
        super();
    }

    create () {
        const player = new GameObject();
        const myComponent = player.addComponent(MyComponent);
    }
}

export default ExampleLevel;
