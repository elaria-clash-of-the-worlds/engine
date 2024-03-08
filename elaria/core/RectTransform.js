import Transform from "./Transform.js";
import Vector2D from "./Vector2D.js";

export default class RectTransform extends Transform {
    #width = 100;
    #height = 100;
    #pivot = new Vector2D(0.5, 0.5); // Center pivot by default
    #anchorMin = new Vector2D(0.5, 0.5);
    #anchorMax = new Vector2D(0.5, 0.5);
    #offsetMin = Vector2D.zero;
    #offsetMax = Vector2D.zero;

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

    cloneTo(newTransform, newParent) {
        super.cloneTo(newTransform, newParent);
        newTransform.width = this.width;
        newTransform.height = this.height;
        newTransform.pivot = this.pivot.clone();
        newTransform.anchorMin = this.anchorMin.clone();
        newTransform.anchorMax = this.anchorMax.clone();
    }
}