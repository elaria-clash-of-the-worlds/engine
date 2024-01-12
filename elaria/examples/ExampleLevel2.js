import SceneDescription from "../core/SceneDescription.js";
import Player from "./Player.js";
import Sprite from "../core/Sprite.js";
import AudioSource from "../core/AudioSource.js";
import Vector2D from "../core/Vector2D.js";
import CircleMover from "./CircleMover.js";

class ExampleLevel2 extends SceneDescription {
    constructor() {
        super("ExampleLevel2");
    }

    build() {
        const player = this.createGameObject("Player");
        player.addComponent(Player);
        player.transform.position = new Vector2D(100, 100);
        const playerComponent = player.addComponent(Player);
        playerComponent.loadSceneIndex = 0;

        const sprite = player.addComponent(Sprite);
        sprite.imageSource = "/elaria/examples/assets/coka.png";
        sprite.width = 156;
        sprite.height = 156;

        const audioSource = player.addComponent(AudioSource);
        audioSource.source = '/elaria/examples/assets/bubbles.wav';

        const childObject = this.createGameObject("Child object");
        childObject.transform.localPosition = new Vector2D(100, 0);
        childObject.transform.setParent(player.transform);
        childObject.addComponent(CircleMover)

        const childSprite = childObject.addComponent(Sprite);
        childSprite.imageSource = "/elaria/examples/assets/coka.png";
        childSprite.width = 50;
        childSprite.height = 50;
    }

    onKey(key, direction) {
        console.info(`Key ${key} is pressed ${direction}, I am the second scene.`);
    }
}

export default ExampleLevel2;
