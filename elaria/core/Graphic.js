import Component from "./Component.js";
import RectTransform from "./RectTransform.js";

export default class Graphic extends Component {
    awake() {
        if (this.gameObject.getComponent(RectTransform) == null)
        {
            throw new Error("Can't find RectTransform on GameObject. When creating new GameObject use withTransform boolean flag!");
        }
    }

    // eslint-disable-next-line no-unused-vars
    draw(ctx, x, y, w, h){
    }

    render(ctx) {
        const rt = this.transform;
        const rectX = -rt.width * rt.pivot.x;
        const rectY = -rt.height * rt.pivot.y;
        this.draw(ctx, rectX, rectY, rt.width, rt.height);
    }
}