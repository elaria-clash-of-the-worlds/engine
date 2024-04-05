const {
    AnchorsPreset,
    AudioSource,
    GameObject,
    SceneDescription,
    Sprite,
    Vector2D,
    Button,
    UIImage,
    AnimatedSprite,
    SpriteSheet,
    Text,
    Animation
} = elaria;

import Player from "./Player.js";
import CircleMover from "./CircleMover.js";
import FPSCounter from "./FPSCounter.js";

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
            imageSource: "../assets/sprite.png", width: 128, height: 128
        });

        player.addComponent(AudioSource, {source: "../assets/bubbles.wav"});

        const childObject = new GameObject("Child object");
        childObject.transform.localPosition = new Vector2D(-100, 0);
        childObject.transform.setParent(player.transform, false);

        childObject.addComponent(CircleMover);
        childObject.addComponent(Sprite, {
            imageSource: "../assets/sprite.png", width: 50, height: 50
        });

        const button = new GameObject("button", true).addComponent(Button);
        button.transform.position = new Vector2D(400, 500);
        button.transform.width = 128;
        button.transform.height = 64;
        button.hoverColor = "rgb(220, 220, 220)";
        button.pressedColor = "rgb(200, 200, 200)";


        const text = new GameObject("label", true).addComponent(Text);
        text.text = "Im Button";
        text.transform.setParent(button.transform, false);
        text.transform.setAnchors(AnchorsPreset.fullRect);
        text.horizontalAlign = "center";
        text.verticalAlign = "center";

        const buttonImage = button.addComponent(UIImage);
        buttonImage.imageSource = "../assets/yellow-T.png";
        buttonImage.pixelPerfect = true;

        const dino = new GameObject("Dino Vita").addComponent(AnimatedSprite);
        dino.transform.position = new Vector2D(300, 300);
        dino.width = 64;
        dino.height = 64;
        dino.pixelPerfect = true;

        const idleAnim = new Animation(
            "idle",
            "../assets/dino_vita.png",
            new SpriteSheet(24, 24, 4, 24),
            0.1,
            "forward",
            false
        );
        idleAnim.onPlayEnd = () => dino.playAnimation("run");

        const runAnim = new Animation(
            "run",
            "../assets/dino_vita.png",
            new SpriteSheet(24, 24, 7, 24, 4),
            0.1,
            "forward",
            false
        );
        runAnim.onPlayEnd = () => dino.playAnimation("kick");

        const kick = new Animation(
            "kick",
            "../assets/dino_vita.png",
            new SpriteSheet(24, 24, 3, 24, 11),
            0.1,
            "forward",
            false
        );
        kick.onPlayEnd = () => dino.playAnimation("hit");

        const hit = new Animation(
            "hit",
            "../assets/dino_vita.png",
            new SpriteSheet(24, 24, 3, 24, 14),
            0.1,
            "forward",
            false
        );
        hit.onPlayEnd = () => dino.playAnimation("crouch");

        const crouch = new Animation(
            "crouch",
            "../assets/dino_vita.png",
            new SpriteSheet(24, 24, 4, 24, 20),
            0.1,
            "forward",
            true
        );

        dino.addAnimation(idleAnim);
        dino.addAnimation(runAnim);
        dino.addAnimation(kick);
        dino.addAnimation(hit);
        dino.addAnimation(crouch);

        const dino2 = GameObject.instantiate(dino.gameObject);
        dino2.transform.position = new Vector2D(400, 300);
        dino2.getComponent(AnimatedSprite).playAnimation("crouch");

        for (let i = 0; i < 5; i++) {
            const dinoClone = GameObject.instantiate(dino2);
            dinoClone.transform.position = new Vector2D(400 + 100 * i, 300);
        }

        const fpsCounter = new GameObject("FpsCounter", true).addComponent(FPSCounter);
        fpsCounter.transform.height = 32;
        fpsCounter.transform.setAnchors(AnchorsPreset.topRight);
    }
}

export default ExampleLevel1;
