import {AudioSource, GameObject, SceneDescription, Sprite, Vector2D} from "../core/ElariaCore.js";
import Player from "./Player.js";
import CircleMover from "./CircleMover.js";

class ExampleLevel1 extends SceneDescription {
    constructor() {
        super("ExampleLevel1");
    }

    build() {
        const player = new GameObject("Player 1");
        player.transform.position = new Vector2D(100, 100);
        player.transform.localRotation = 1;
        player.transform.localScale = new Vector2D(1, 0.5);

        player.addComponent(Player, {loadSceneIndex: 1});
        player.addComponent(Sprite, {
            imageSource: "/elaria/examples/assets/sprite.png",
            width: 128,
            height: 128
        });

        player.addComponent(AudioSource, {source: "/elaria/examples/assets/bubbles.wav"});

        const childObject = new GameObject("Child object");
        childObject.transform.localPosition = new Vector2D(-100, 0);
        childObject.transform.setParent(player.transform, false);

        childObject.addComponent(CircleMover);
        childObject.addComponent(Sprite, {
            imageSource: "/elaria/examples/assets/sprite.png",
            width: 50,
            height: 50
        });
    }
}

export default ExampleLevel1;
