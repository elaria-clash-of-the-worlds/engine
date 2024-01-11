import SceneDescription from "../core/SceneDescription.js";
import TipaSprite from "./TipaSprite.js";

class ExampleLevel2 extends SceneDescription {
    constructor() {
        super("ExampleLevel2");
    }

    build() {
        const player = this.createGameObject();
        const tipaSprite = player.addComponent(TipaSprite);
    }

    onKey(key, direction) {
        console.info(`Key ${key} is pressed ${direction}, I am the second scene.`);
    }
}

export default ExampleLevel2;
