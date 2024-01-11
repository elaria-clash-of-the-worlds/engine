import SceneDescription from "../core/SceneDescription.js";
import Player from "./Player.js";

class ExampleLevel1 extends SceneDescription {
    constructor() {
        super("ExampleLevel1");
    }

    build() {
        const player = this.createGameObject("Player");
        const myComponent = player.addComponent(Player);
    }
}

export default ExampleLevel1;
