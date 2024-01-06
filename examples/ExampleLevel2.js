import SceneDescription from "../core/SceneDescription.js";
import TipaSprite from "./TipaSprite.js";

class ExampleLevel2 extends SceneDescription {
    constructor () {
        super("ExampleLevel2");
    }

    build () {
        const player = this.createGameObject();
        const tipaSprite = player.addComponent(TipaSprite);
    }
}

export default ExampleLevel2;
