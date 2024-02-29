import {
    Component,
    Debug,
    GameObject,
    SceneDescription,
    Sprite,
    Tween,
    Vector2D,
    WorldText
} from "../../core/ElariaCore.js";
import {Ease, LoopType} from "../../core/Tween.js";

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
        this.parentContainer = null;
    }

    start() {
        this.parentContainer = new GameObject("Parent Container");

        const easingFunctions = Object.keys(Ease);
        const countInRow = 8;
        const graphSize = 196;
        const vMargin = 32;
        const hMargin = 32;
        let x = 0;
        let y = 0;

        let label = new GameObject("Label: Easing Functions").addComponent(WorldText);
        label.text = "Easing Functions";
        label.transform.setParent(this.parentContainer.transform);
        label.transform.localPosition = new Vector2D(16, 28);
        label.fontSize = 24;

        for (const easing of easingFunctions) {
            const demoObject = new GameObject(easing + " Grid");
            const background = demoObject.addComponent(Sprite);
            background.imageSource = "grid.jpg";
            background.width = graphSize;
            background.height = graphSize;

            demoObject.transform.setParent(this.parentContainer.transform);
            demoObject.transform.localPosition = new Vector2D(
                (graphSize / 2 + 16) + (graphSize + hMargin) * x,
                (graphSize / 2 + 16) + (graphSize + vMargin) * y + 32
            );

            const easingObject = new GameObject(easing + " demo object");
            easingObject.transform.setParent(demoObject.transform);

            const sprite = easingObject.addComponent(Sprite);
            sprite.imageSource = "/elaria/examples/assets/sprite.png";
            sprite.width = 48;
            sprite.height = 48;

            const label = new GameObject("Label: " + easing).addComponent(WorldText);
            label.text = easing;
            label.transform.setParent(demoObject.transform);
            label.transform.localPosition = new Vector2D(-graphSize / 2 + 4, -graphSize / 2 + 18);

            Tween
                .localPositionX(easingObject.transform, -graphSize / 2.5, graphSize / 2.5, 2)
                .setEase(Ease.linear)
                .setLoops(-1, LoopType.rewind);

            Tween
                .localPositionY(easingObject.transform, graphSize / 2.5 - 16, -graphSize / 2.5 + 16, 2)
                .setEase(Ease[easing])
                .setLoops(-1, LoopType.rewind);

            x++;
            if (x >= countInRow) {
                x = 0;
                y++;
            }
        }

        if (x !== 0) y++;
        x = 0;

        label = new GameObject("Label: Loop Types").addComponent(WorldText);
        label.text = "Loop Types";
        label.transform.setParent(this.parentContainer.transform);
        label.transform.localPosition = new Vector2D(16, (graphSize + vMargin) * y + 56);
        label.fontSize = 24;

        const loopTypes = [LoopType.restart, LoopType.pingPong, LoopType.incremental, LoopType.rewind];
        const loopTypeNames = {0: "Restart", 1: "PingPong", 2: "Incremental", 3: "Rewind"};
        for (const loopType of loopTypes) {
            const demoObject = new GameObject(loopTypeNames[loopType] + " Grid");
            const background = demoObject.addComponent(Sprite);
            background.imageSource = "grid.jpg";
            background.width = graphSize;
            background.height = graphSize;

            demoObject.transform.setParent(this.parentContainer.transform);
            demoObject.transform.localPosition = new Vector2D(
                (graphSize / 2 + 16) + (graphSize + hMargin) * x,
                (graphSize / 2 + 16) + (graphSize + vMargin) * y + 64
            );

            const easingObject = new GameObject(loopTypeNames[loopType] + " demo object");
            easingObject.transform.setParent(demoObject.transform);

            const sprite = easingObject.addComponent(Sprite);
            if (loopType === LoopType.incremental)
            {
                sprite.imageSource = "/elaria/examples/assets/coka.png";
            }
            else
            {
                sprite.imageSource = "/elaria/examples/assets/sprite.png";
            }
            sprite.width = 48;
            sprite.height = 48;

            const label = new GameObject("Label: " + loopTypeNames[loopType]).addComponent(WorldText);
            label.text = loopTypeNames[loopType];
            label.transform.setParent(demoObject.transform);
            label.transform.localPosition = new Vector2D(-graphSize / 2 + 4, -graphSize / 2 + 24);

            Tween
                .localPositionX(easingObject.transform, -graphSize / 2.5, graphSize / 2.5, 2)
                .setEase(Ease.linear)
                .setLoops(-1, loopType);

            Tween
                .localPositionY(easingObject.transform, graphSize / 2.5 - 16, -graphSize / 2.5 + 16, 2)
                .setEase(Ease.outQuart)
                .setLoops(-1, loopType);

            x++;
            if (x > countInRow) {
                x = 0;
                y++;
            }
        }

        Tween
            .create(0, 100, 1)
            .setDelay(5)
            .setEase(Ease.inOutQuad)
            .setLoops(1, LoopType.pingPong)
            .onStart(() => console.log("Tween started"))
            .onComplete(() => console.log("Tween complete"))
            .bindTo(x => console.log(x));

        console.log(Debug.getSceneHierarchy());
    }

    update(dt) {
        if (kd.UP.isDown()) {
            this.parentContainer.transform.positionY = Math.min(0, this.parentContainer.transform.positionY + 500 * dt);
        }

        if (kd.DOWN.isDown()) {
            this.parentContainer.transform.positionY = this.parentContainer.transform.positionY - 500 * dt;
        }
    }
}0;

export default TweenDemo;