import Transform from "./Transform.js";
import Vector2D from "../types/Vector2D.js";
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
        this.#changed = true;
    }

    get offsetMax() {
        return this.#offsetMax;
    }

    set offsetMax(value) {
        this.#offsetMax = value;
        this.#changed = true;
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
        this.#shouldRecalculateOffsets = true;
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
            parentWidth: parentWidth,
            parentHeight: parentHeight,
            parentPivot: parentPivot,
            parentPivotInRectangleSpace: parentPivotInRectangleSpace
        };
    }

    setParent(newParent, worldPositionStays = true) {
        super.setParent(newParent, worldPositionStays);
        if (newParent === this) return;
        this.recalculateOffsets();
    }

    /**
     * Sets the anchors of the RectTransform.
     * @param {AnchorsPreset} preset - The preset to set the anchors to.
     * @param {boolean} applyAnchors - Whether to apply the anchors immediately.
     */
    setAnchors(preset, applyAnchors = true) {
        let offsetMin = Vector2D.zero;
        let offsetMax = Vector2D.zero;
        let anchoredPosition = Vector2D.zero;

        switch (preset) {
        case AnchorsPreset.fullRect:
            this.anchorMin = new Vector2D(0, 0);
            this.anchorMax = new Vector2D(1, 1);
            offsetMin = new Vector2D(0, 0);
            offsetMax = new Vector2D(0, 0);
            break;
        case AnchorsPreset.topLeft:
            this.anchorMin = new Vector2D(0, 0);
            this.anchorMax = new Vector2D(0, 0);
            anchoredPosition = new Vector2D(this.width / 2, this.height / 2);
            offsetMin = new Vector2D(0, 0);
            offsetMax = new Vector2D(this.width, this.height);
            break;
        case AnchorsPreset.topRight:
            this.anchorMin = new Vector2D(1, 0);
            this.anchorMax = new Vector2D(1, 0);
            anchoredPosition = new Vector2D(-this.width / 2, this.height / 2);
            offsetMin = new Vector2D(-this.width, 0);
            offsetMax = new Vector2D(0, this.height);
            break;
        case AnchorsPreset.bottomRight:
            this.anchorMin = new Vector2D(1, 1);
            this.anchorMax = new Vector2D(1, 1);
            anchoredPosition = new Vector2D(-this.width / 2, -this.height / 2);
            offsetMin = new Vector2D(-this.width, -this.height);
            offsetMax = new Vector2D(0, 0);
            break;
        case AnchorsPreset.bottomLeft:
            this.anchorMin = new Vector2D(0, 1);
            this.anchorMax = new Vector2D(0, 1);
            anchoredPosition = new Vector2D(this.width / 2, -this.height / 2);
            offsetMin = new Vector2D(0, -this.height);
            offsetMax = new Vector2D(this.width, 0);
            break;
        case AnchorsPreset.centerLeft:
            this.anchorMin = new Vector2D(0, 0.5);
            this.anchorMax = new Vector2D(0, 0.5);
            anchoredPosition = new Vector2D(this.width / 2, 0);
            offsetMin = new Vector2D(0, -this.height / 2);
            offsetMax = new Vector2D(this.width, this.height / 2);
            break;
        case AnchorsPreset.centerTop:
            this.anchorMin = new Vector2D(0.5, 0);
            this.anchorMax = new Vector2D(0.5, 0);
            anchoredPosition = new Vector2D(0, this.height / 2);
            offsetMin = new Vector2D(-this.width / 2, 0);
            offsetMax = new Vector2D(this.width / 2, this.height);
            break;
        case AnchorsPreset.centerRight:
            this.anchorMin = new Vector2D(1, 0.5);
            this.anchorMax = new Vector2D(1, 0.5);
            anchoredPosition = new Vector2D(-this.width / 2, 0);
            offsetMin = new Vector2D(-this.width, -this.height / 2);
            offsetMax = new Vector2D(0, this.height / 2);
            break;
        case AnchorsPreset.centerBottom:
            this.anchorMin = new Vector2D(0.5, 1);
            this.anchorMax = new Vector2D(0.5, 1);
            anchoredPosition = new Vector2D(0, -this.height / 2);
            offsetMin = new Vector2D(-this.width / 2, -this.height);
            offsetMax = new Vector2D(this.width / 2, 0);
            break;
        case AnchorsPreset.center:
            this.anchorMin = new Vector2D(0.5, 0.5);
            this.anchorMax = new Vector2D(0.5, 0.5);
            anchoredPosition = new Vector2D(0, 0);
            offsetMin = new Vector2D(-this.width / 2, -this.height / 2);
            offsetMax = new Vector2D(this.width / 2, this.height / 2);
            break;
        case AnchorsPreset.leftWide:
            this.anchorMin = new Vector2D(0, 0);
            this.anchorMax = new Vector2D(0, 1);
            anchoredPosition = new Vector2D(this.width / 2, 0);
            offsetMin = new Vector2D(0, 0);
            offsetMax = new Vector2D(this.width, 0);
            break;
        case AnchorsPreset.topWide:
            this.anchorMin = new Vector2D(0, 0);
            this.anchorMax = new Vector2D(1, 0);
            anchoredPosition = new Vector2D(0, this.height / 2);
            offsetMin = new Vector2D(0, 0);
            offsetMax = new Vector2D(0, this.height);
            break;
        case AnchorsPreset.rightWide:
            this.anchorMin = new Vector2D(1, 0);
            this.anchorMax = new Vector2D(1, 1);
            anchoredPosition = new Vector2D(-this.width / 2, 0);
            offsetMin = new Vector2D(-this.width, 0);
            offsetMax = new Vector2D(0, 0);
            break;
        case AnchorsPreset.bottomWide:
            this.anchorMin = new Vector2D(0, 1);
            this.anchorMax = new Vector2D(1, 1);
            anchoredPosition = new Vector2D(0, -this.height / 2);
            offsetMin = new Vector2D(0, -this.height);
            offsetMax = new Vector2D(0, 0);
            break;
        case AnchorsPreset.vCenterWide:
            this.anchorMin = new Vector2D(0.5, 0);
            this.anchorMax = new Vector2D(0.5, 1);
            anchoredPosition = new Vector2D(0, 0);
            offsetMin = new Vector2D(-this.width / 2, 0);
            offsetMax = new Vector2D(this.width / 2, 0);
            break;
        case AnchorsPreset.hCenterWide:
            this.anchorMin = new Vector2D(0, 0.5);
            this.anchorMax = new Vector2D(1, 0.5);
            anchoredPosition = new Vector2D(0, 0);
            offsetMin = new Vector2D(0, -this.height / 2);
            offsetMax = new Vector2D(0, this.height / 2);
            break;
        }

        if (!applyAnchors) {
            const values = this.#getParentValues();
            const anchorMin = this.anchorMin.mul(values.parentSize);
            const anchorMax = this.anchorMax.mul(values.parentSize);
            const center = anchorMin.add(anchorMax).divScalar(2);
            this.anchoredPosition = this.localPosition.add(values.parentPivotInRectangleSpace).sub(center);

            this.recalculateOffsets();
            this.#shouldRecalculateOffsets = false;
        } else {
            this.offsetMin = offsetMin;
            this.offsetMax = offsetMax;
            this.anchoredPosition = anchoredPosition;
            this.recalculateRect();
            this.#changed = false;
        }
    }

    recalculateOffsets() {
        const values = this.#getParentValues();
        const anchorMin = this.anchorMin.mul(values.parentSize);
        const anchorMax = this.anchorMax.mul(values.parentSize);
        const pivotPosition = this.pivot.mul(this.width, this.height);
        const pivotInRectangleSpace = this.localPosition.add(values.parentPivotInRectangleSpace);
        this.offsetMin = pivotInRectangleSpace.sub(pivotPosition).sub(anchorMin);
        this.offsetMax = anchorMin.add(this.offsetMin).add(this.width, this.height).sub(anchorMax);
    }

    recalculateRect() {
        const values = this.#getParentValues();

        const anchorMin = this.anchorMin.mul(values.parentSize);
        const anchorMax = this.anchorMax.mul(values.parentSize);

        this.#width = anchorMax.x + this.offsetMax.x - (anchorMin.x + this.offsetMin.x);
        this.#height = anchorMax.y + this.offsetMax.y - (anchorMin.y + this.offsetMin.y);

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
        if (this.#shouldRecalculateOffsets) {
            this.#shouldRecalculateOffsets = false;
            this.recalculateOffsets();
        }
        if (this.#changed) {
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

const AnchorsPreset = Object.freeze({
    fullRect: 0,
    topLeft: 1,
    topRight: 2,
    bottomRight: 3,
    bottomLeft: 4,
    centerLeft: 5,
    centerTop: 6,
    centerRight: 7,
    centerBottom: 8,
    center: 9,
    leftWide: 10,
    topWide: 11,
    rightWide: 12,
    bottomWide: 13,
    vCenterWide: 14,
    hCenterWide: 15
});

export {AnchorsPreset};