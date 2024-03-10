import Transform from "./Transform.js";
import Vector2D from "./Vector2D.js";
import Game from "./Game.js";

export default class RectTransform extends Transform {
    // All values are default for center pivot and anchor and for width/height = 100
    #width = 100;
    #height = 100;
    #pivot = new Vector2D(0.5, 0.5);
    #anchorMin = new Vector2D(0.5, 0.5);
    #anchorMax = new Vector2D(0.5, 0.5);
    #offsetMin = new Vector2D(-50, -50);
    #offsetMax = new Vector2D(50, 50);
    #anchoredPosition = new Vector2D(0, 0);
    #changed = true;
    #shouldRecalculateOffsets = true;

    /**
     * Gets the width of the rectangle.
     * @returns {number} The width of the rectangle.
     */
    get width() {
        return this.#width;
    }

    /**
     * Sets the width of the rectangle.
     * @param {number} value - The new width value.
     */
    set width(value) {
        this.#width = value;
        this.#changed = true;
        this.#shouldRecalculateOffsets = true;
    }

    /**
     * Gets the height of the rectangle.
     * @returns {number} The height of the rectangle.
     */
    get height() {
        return this.#height;
    }

    /**
     * Sets the height of the rectangle.
     * @param {number} value - The new height value.
     */
    set height(value) {
        this.#height = value;
        this.#changed = true;
        this.#shouldRecalculateOffsets = true;
    }

    /**
     * Gets the pivot point of the rectangle.
     * @returns {Vector2D} The pivot point of the rectangle.
     */
    get pivot() {
        return this.#pivot;
    }

    /**
     * Sets the pivot point of the rectangle.
     * @param {Vector2D} value - The new pivot point value.
     */
    set pivot(value) {
        this.#pivot = value;
    }

    /**
     * Gets the minimum anchor point of the rectangle.
     * @returns {Vector2D} The minimum anchor point of the rectangle.
     */
    get anchorMin() {
        return this.#anchorMin;
    }

    /**
     * Sets the minimum anchor point of the rectangle.
     * @param {Vector2D} value - The new minimum anchor point value.
     */
    set anchorMin(value) {
        this.#anchorMin = value;
        this.#shouldRecalculateOffsets = true;
    }

    /**
     * Gets the maximum anchor point of the rectangle.
     * @returns {Vector2D} The maximum anchor point of the rectangle.
     */
    get anchorMax() {
        return this.#anchorMax;
    }

    /**
     * Sets the maximum anchor point of the rectangle.
     * @param {Vector2D} value - The new maximum anchor point value.
     */
    set anchorMax(value) {
        this.#anchorMax = value;
        this.#shouldRecalculateOffsets = true;
    }

    get offsetMin() {
        return this.#offsetMin;
    }

    set offsetMin(value) {
        this.#offsetMin = value;
    }

    get offsetMax() {
        return this.#offsetMax;
    }

    set offsetMax(value) {
        this.#offsetMax = value;
    }

    get anchoredPosition() {
        return this.#anchoredPosition;
    }

    set anchoredPosition(value) {
        this.#anchoredPosition = value;
        const values = this.#getParentValues();
        const anchorMin = this.anchorMin.mul(values.parentSize);
        const anchorMax = this.anchorMax.mul(values.parentSize);
        const center = anchorMin.add(anchorMax).divScalar(2);
        super.localPosition = center.add(value).sub(values.parentPivotInRectangleSpace);
    }

    get localPosition() {
        return super.localPosition;
    }

    set localPosition(newPosition) {
        super.localPosition = newPosition;
        this.recalculateOffsets();
    }

    #getParentValues() {
        if (this.parent != null && !(this.parent instanceof RectTransform)) {
            throw new Error(`Parent ${this.parent.gameObject.name} of ${this.gameObject.name} RectTransform should also have a RectTransform component`);
        }

        const parentWidth = this.parent ? this.parent.width : Game.canvas.width;
        const parentHeight = this.parent ? this.parent.height : Game.canvas.height;
        const parentPivot = this.parent ? this.parent.pivot : new Vector2D(0, 0);
        const parentPivotInRectangleSpace = parentPivot.mul(parentWidth, parentHeight);

        return {
            parentSize: new Vector2D(parentWidth, parentHeight),
            parentWidth : parentWidth,
            parentHeight : parentHeight,
            parentPivot : parentPivot,
            parentPivotInRectangleSpace : parentPivotInRectangleSpace
        };
    }

    setParent(newParent, worldPositionStays = true) {
        super.setParent(newParent, worldPositionStays);
        if (newParent === this) return;
        this.recalculateOffsets();
    }

    recalculateOffsets() {
        const values = this.#getParentValues();
        const anchorMin = this.anchorMin.mul(values.parentSize);
        const anchorMax = this.anchorMax.mul(values.parentSize);
        const pivotPosition = this.pivot.mul(this.width, this.height);
        const pivotInRectangleSpace = this.localPosition.add(values.parentPivotInRectangleSpace);
        this.offsetMin = pivotInRectangleSpace.sub(pivotPosition).sub(anchorMin);
        this.offsetMax = anchorMin.add(this.offsetMin).add(this.width, this.height).sub(anchorMax);
        console.log("RecalculateOffsets: " + this.gameObject.name);
        console.log(anchorMin.toString() + "  —  " + anchorMax.toString());
        console.log(this.width + "  —  " + this.height);
        console.log(this.offsetMin.toString());
        console.log(this.offsetMax.toString());
    }

    recalculateRect() {
        const values = this.#getParentValues();

        const anchorMin = this.anchorMin.mul(values.parentSize);
        const anchorMax = this.anchorMax.mul(values.parentSize);

        console.log("RecaclulateRect: " + this.gameObject.name);
        console.log(values.parentSize.toString());
        console.log(this.anchoredPosition.toString());
        console.log(anchorMin.toString() + "  —  " + anchorMax.toString());
        console.log(this.offsetMin.toString());
        console.log(this.offsetMax.toString());

        const newWidth = anchorMax.x + this.offsetMax.x - (anchorMin.x + this.offsetMin.x);
        const newHeight = anchorMax.y + this.offsetMax.y - (anchorMin.y + this.offsetMin.y);

        console.log(this.width + "  —  " + this.height);
        console.log(newWidth + "  —  " + newHeight);

        this.#width = newWidth;
        this.#height = newHeight;

        // const pivotInRectangleSpace = anchorMin.add(this.offsetMin).add(this.pivot.mul(newWidth, newHeight));
        const center = anchorMin.add(anchorMax).divScalar(2);
        super.localPosition = center.add(this.anchoredPosition).sub(values.parentPivotInRectangleSpace);

        this.#recalculateChildren();
        this.#changed = false;
    }

    #recalculateChildren() {
        for (const child of this.children) {
            if (child instanceof RectTransform) {
                child.recalculateRect();
            }
        }
    }

    awake() {
        this.recalculateOffsets();
    }

    // eslint-disable-next-line no-unused-vars
    update(dt) {
        if (this.#shouldRecalculateOffsets)
        {
            this.#shouldRecalculateOffsets = false;
            this.recalculateOffsets();
        }
        if (this.#changed)
        {
            this.#changed = false;
            this.#recalculateChildren();
        }
    }

    cloneTo(newTransform, newParent) {
        super.cloneTo(newTransform, newParent);
        newTransform.width = this.width;
        newTransform.height = this.height;
        newTransform.pivot = this.pivot.clone();
        newTransform.anchorMin = this.anchorMin.clone();
        newTransform.anchorMax = this.anchorMax.clone();
    }
}