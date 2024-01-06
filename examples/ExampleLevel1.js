import SceneDescription from "../core/SceneDescription.js";
import MyComponent from "./MyComponent.js";

class ExampleLevel1 extends SceneDescription {
    constructor () {
        super();
    }

    build () {
        const player = this.createGameObject("Player");
        const myComponent = player.addComponent(MyComponent);

        const child1 = this.createGameObject("Child 1");
        child1.transform.setParent(player.transform);

        const child2 = this.createGameObject("Child 2 ");
        child2.transform.setParent(player.transform);
    }
}

export default ExampleLevel1;
