import {
    AnchorsPreset,
    GameObject,
    Graphic,
    LoopType,
    SceneDescription,
    Tween,
    Vector2D,
    WorldText
} from "../../core/Elaria.js";

export default class RectTransformDemo extends SceneDescription {
    constructor() {
        super("RectTransform Demo Scene");
    }
    build() {
        const anchorPresets = Object.keys(AnchorsPreset);

        let x = 0;
        let y = 0;
        const maxInRow = 6;

        for (const preset of anchorPresets) {
            const parentRect = new GameObject(preset, true).addComponent(Rect).transform;
            parentRect.width = 200;
            parentRect.height = 200;
            parentRect.pivot = new Vector2D(0, 0);
            parentRect.position = new Vector2D(16 + (parentRect.width + 64) * x, 48 + (parentRect.height + 88) * y);

            const childRect = new GameObject(preset, true).addComponent(Rect);
            childRect.color = "blue";
            childRect.transform.height = 32;
            childRect.transform.width = 32;
            childRect.transform.parent = parentRect;
            childRect.transform.setAnchors(AnchorsPreset[preset]);

            const worldText = new GameObject("WorldText").addComponent(WorldText);
            worldText.transform.parent = parentRect;
            worldText.text = preset;
            worldText.fontSize = 24;
            worldText.transform.localPosition = new Vector2D(0, -12);

            Tween.create(200, 250, 2)
                .bindTo(v => {
                    parentRect.width = v;
                    parentRect.height = v;
                })
                .setLoops(-1, LoopType.pingPong);

            x++;
            if (x >= maxInRow)
            {
                x = 0;
                y++;
            }
        }
    }
}

class Rect extends Graphic {
    color = "red";
    draw(ctx, x, y, w, h) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, w, h);
        ctx.restore();
    }
}