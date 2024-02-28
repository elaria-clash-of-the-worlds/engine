import {Component, GameObject, SceneDescription, Sprite, Vector2D} from "../../core/ElariaCore.js";
import {Ease, LoopType, Tween} from "../../core/ElariaTween.js";

class TweenDemo extends SceneDescription {
    constructor() {
        super("Tween Demo");
    }

    build() {
        const tweenDemoObject = new GameObject("Tween Demo Object");
        tweenDemoObject.addComponent(TweenDemoComponent);
    }
}

class TweenDemoComponent extends Component {
    constructor() {
        super();
        this.testTween = null;
    }

    start() {
        const easingFunctions = Object.keys(Ease);
        const countInRow = 7;
        const vMargin = 32;
        const hMargin = 32;
        let x = 0;
        let y = 0;

        for (const easingFunction of easingFunctions) {
            const gridObject = new GameObject(easingFunction + " Grid");
            const gridSprite = gridObject.addComponent(Sprite);
            gridSprite.imageSource = "grid.jpg";
            gridSprite.width = 196;
            gridSprite.height = 196;

            gridObject.transform.position = new Vector2D(
                (gridSprite.width / 2 + 16) + (gridSprite.width + hMargin) * x,
                (gridSprite.width / 2 + 16) + (gridSprite.width + vMargin) * y
            );

            const exampleObject = new GameObject(easingFunction + " demo object");
            exampleObject.transform.setParent(gridObject.transform);

            const sprite = exampleObject.addComponent(Sprite);
            sprite.imageSource = "/elaria/examples/assets/sprite.png";
            sprite.width = 64;
            sprite.height = 64;

            Tween
                .localPositionX(exampleObject.transform, -gridSprite.width / 2.5, gridSprite.width / 2.5, 2)
                .setEase(Ease.linear)
                .setLoops(-1, LoopType.rewind);

            Tween
                .localPositionY(exampleObject.transform, gridSprite.height / 2.5 - 16, -gridSprite.height / 2.5 + 16, 2)
                .setEase(Ease[easingFunction])
                .setLoops(-1, LoopType.rewind);

            x++;
            if (x > countInRow) {
                x = 0;
                y++;
            }
        }

    }
}

export default TweenDemo;