import Player from "./Player.js";
import CircleMover from "./CircleMover.js";
import {AudioSource, GameObject, SceneDescription, Sprite, Vector2D} from "../core/ElariaCore.js";

class ExampleLevel1 extends SceneDescription {
    constructor() {
        super("ExampleLevel1");
    }

    build() {
        const player = new GameObject("Player 1");
        player.transform.position = new Vector2D(100, 100);
        const playerComponent = player.addComponent(Player);
        playerComponent.loadSceneIndex = 1;

        const sprite = player.addComponent(Sprite);
        sprite.imageSource = "/elaria/examples/assets/sprite.png";
        sprite.width = 128;
        sprite.height = 128;

        const audioSource = player.addComponent(AudioSource);
        audioSource.source = "/elaria/examples/assets/bubbles.wav";

        const childObject = new GameObject("Child object");
        childObject.transform.localPosition = new Vector2D(100, 0);
        childObject.transform.setParent(player.transform);
        childObject.addComponent(CircleMover);

        const childSprite = childObject.addComponent(Sprite);
        childSprite.imageSource = "/elaria/examples/assets/sprite.png";
        childSprite.width = 50;
        childSprite.height = 50;
    }
}

export default ExampleLevel1;
