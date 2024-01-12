import SceneDescription from "../core/SceneDescription.js";
import Player from "./Player.js";
import Sprite from "../core/Sprite.js";
import AudioSource from "../core/AudioSource.js";
import Vector2D from "../core/Vector2D.js";
import CircleMover from "./CircleMover.js";

class ExampleLevel1 extends SceneDescription {
    constructor() {
        super("ExampleLevel1");
    }

    build() {
        const player = this.createGameObject("Player");
        player.addComponent(Player);

        const sprite = player.addComponent(Sprite);
        sprite.imageSource = "https://mosnapitki.ru/images/cms/thumbs/8c856c34813e8e6eaa248115eef774bea5ffd7a1/sprite_lemon_lime_330ml__535_535_1_100.jpg"
        sprite.width = 128;
        sprite.height = 128;

        const audioSource = player.addComponent(AudioSource);
        audioSource.source = '/elaria/examples/assets/bubbles.wav';

        const childObject = this.createGameObject("Child object");
        childObject.transform.localPosition = new Vector2D(100, 0);
        childObject.transform.setParent(player.transform);
        childObject.addComponent(CircleMover)

        const childSprite = childObject.addComponent(Sprite);
        childSprite.imageSource = "https://mosnapitki.ru/images/cms/thumbs/8c856c34813e8e6eaa248115eef774bea5ffd7a1/sprite_lemon_lime_330ml__535_535_1_100.jpg"
        childSprite.width = 50;
        childSprite.height = 50;
    }
}

export default ExampleLevel1;
