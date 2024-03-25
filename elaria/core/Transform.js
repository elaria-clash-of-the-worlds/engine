import Component from "./Component.js";
import Vector2D from "./Vector2D.js";
import GameObject from "./GameObject.js";

export default class Transform extends Component {
    #parent = null;
    #localPosition = Vector2D.zero;
    #localRotation = 0;
    #localScale = Vector2D.one;

    _init() {
        this._children = [];
        this.setParent(null);
    }

    /**@return {Transform | RectTransform}*/
    get transform() {
        return this;
    }

    /**
     * Get the world position of the object.
     *
     * @return {Readonly<Vector2D>} The world position of the object.
     */
    get position() {
        if (this.#parent == null) {
            return this.#localPosition;
        }

        const parentWorldPosition = this.#parent.position;
        const parentWorldRotation = this.#parent.rotation;

        const rotatedOffset = this.#localPosition.rotate(parentWorldRotation);
        return parentWorldPosition.add(rotatedOffset);
    }


    /**
     * Sets the world position of the object by adjusting its local position based on the parent's position.
     *
     * @param {Readonly<Vector2D>} newPosition - The new world position to set.
     */
    set position(newPosition) {
        if (this.#parent == null) {
            this.localPosition = newPosition;
        } else {
            const parentWorldPosition = this.#parent.position;
            this.localPosition = newPosition.sub(parentWorldPosition).rotate(-this.#parent.rotation);
        }
    }

    /**
     * Gets the X component of the world position of the object.
     *
     * @return {number} The X component of the world position.
     */
    get positionX() {
        return this.position.x;
    }

    /**
     * Sets the X component of the world position of the object.
     *
     * @param {number} value - The new value for the X component of the world position.
     */
    set positionX(value) {
        this.position = this.position.setX(value);
    }

    /**
     * Gets the Y component of the world position of the object.
     *
     * @return {number} The Y component of the world position.
     */
    get positionY() {
        return this.position.y;
    }

    /**
     * Sets the Y component of the world position of the object.
     *
     * @param {number} value - The new value for the Y component of the world position.
     */
    set positionY(value) {
        this.#localPosition = this.position.setY(value);
    }

    /**
     * Get the local position of the object.
     *
     * @return {Vector2D} description of return value
     */
    get localPosition() {
        return this.#localPosition;
    }

    /**
     * Set the local position of the object.
     * @param {Vector2D} newPosition - The new local position to set.
     */
    set localPosition(newPosition) {
        this.#localPosition = newPosition;
    }

    /**
     * Gets the X component of the local position of the object.
     *
     * @return {number} The X component of the local position.
     */
    get localPositionX() {
        return this.#localPosition.x;
    }

    /**
     * Sets the X component of the local position of the object.
     *
     * @param {number} value - The new value for the X component of the local position.
     */
    set localPositionX(value) {
        this.#localPosition = this.#localPosition.setX(value);
    }

    /**
     * Gets the Y component of the local position of the object.
     *
     * @return {number} The Y component of the local position.
     */
    get localPositionY() {
        return this.#localPosition.y;
    }

    /**
     * Sets the Y component of the local position of the object.
     *
     * @param {number} value - The new value for the Y component of the local position.
     */
    set localPositionY(value) {
        this.#localPosition = this.#localPosition.setY(value);
    }

    /**
     * Get the world rotation of the object.
     * @returns {number} - The world rotation of the object.
     */
    get rotation() {
        if (this.parent != null) {
            return this.parent.rotation + this.localRotation;
        }
        return this.localRotation;
    }

    /**
     * Sets the world rotation of the object by adjusting its local rotation based on the parent's rotation.
     *
     * @param {number} value - The new world rotation to set.
     */
    set rotation(value) {
        this.localRotation = this.parent != null ? value - this.parent.rotation : value;
    }

    /**
     * Gets the local rotation of the object.
     *
     * @return {number} The local rotation of the object.
     */
    get localRotation() {
        return this.#localRotation;
    }

    /**
     * Sets the local rotation of the object.
     *
     * @param {number} value - The new local rotation to set.
     */
    set localRotation(value) {
        this.#localRotation = value;
    }

    /**
     * Gets the local scale of the object.
     *
     * @return {Vector2D} The local scale of the object.
     */
    get localScale() {
        return this.#localScale;
    }

    /**
     * Sets the local scale of the object.
     *
     * @param {Vector2D} value - The new local scale to set.
     */
    set localScale(value) {
        this.#localScale = value;
    }

    /**
     * Get the children of the Transform.
     *
     * @return {Array<Transform>}
     */
    get children() {
        return this._children;
    }

    /**
     * Returns the parent of the current object.
     *
     * @return {Transform | RectTransform} The parent of the current object, or null if the current object is the root parent.
     */
    get parent() {
        if (this.#parent === this.gameObject.scene._container) {
            return null;
        }
        return this.#parent;
    }

    set parent(newParent) {
        this.setParent(newParent, true);
    }

    /**
     * Sets the parent of the current object.
     *
     * @param {Transform|null} newParent - The parent object to set, or null to set the object as a root parent.
     * @param {boolean} worldPositionStays - If true, the parent-relative position, scale, and rotation are modified
     *                                       such that the object keeps the same world space position, rotation, and scale
     *                                       as before.
     * @throws {Error} Throws an error if the parent is not an instance of Transform.
     */
    setParent(newParent, worldPositionStays = true) {
        if (newParent !== null && !(newParent instanceof Transform)) {
            throw new Error("Parent must be an instance of Transform or null.");
        }

        if (newParent === this) return;

        const oldParent = this.#parent;

        // Remove from old parent's children
        if (oldParent !== null) {
            oldParent._children.splice(oldParent._children.indexOf(this), 1);
        }

        const previousPosition = this.position;
        const previousRotation = this.rotation;
        this.#parent = newParent == null ? this.gameObject.scene._container : newParent;
        this.#parent._children.push(this);

        if (worldPositionStays && oldParent !== null) {
            this.position = previousPosition;
            this.rotation = previousRotation;
            this.localScale = new Vector2D(
                this.localScale.x * oldParent.localScale.x / this.#parent.localScale.x,
                this.localScale.y * oldParent.localScale.y / this.#parent.localScale.y
            );
        }
    }

    /**
     * Moves the object to a new sibling index within its parent.
     *
     * @param {number} index - The index of the new sibling position.
     * @throws {Error} - If the index is out of bounds.
     */
    setSiblingIndex(index) {
        const parentChildren = this.#parent._children;
        if (index < 0 || index >= parentChildren.length) {
            throw new Error(`Invalid sibling index - ${index}! The object has ${parentChildren.length} children.`);
        }
        const child = parentChildren.splice(parentChildren.indexOf(this), 1)[0];
        parentChildren.splice(index, 0, child);
    }

    /**
     * Return the index of the current object within its parent's children array.
     *
     * @return {int} The index of the current object within its parent's children array.
     */
    getSiblingIndex() {
        return this.#parent._children.indexOf(this);
    }

    /**
     * Returns the child at the given index.
     *
     * @param {number} childIndex - The index of the child.
     * @return {Transform} The child at the given index.
     * @throws {Error} If the index is out of bounds.
     */
    getChild(childIndex) {
        if (childIndex < 0 || childIndex >= this._children.length) {
            throw new Error(`Invalid child index - ${childIndex}! The object has ${this._children.length} children.`);
        }
        return this._children[childIndex];
    }

    cloneTo(newTransform, newParent) {
        // Set world properties, because at that moment transform doesn't have a parent
        newTransform.position = this.position;
        newTransform.rotation = this.rotation;
        newTransform.localScale = this.localScale;

        // Set the parent for the clone transform
        if (newParent instanceof Transform) {
            newTransform.parent = newParent;
        }

        // Recursively instantiate children
        for (const child of this.children) {
            GameObject.instantiate(child.gameObject, newTransform);
        }
    }

    /**
     * Called when the object is being destroyed.
     */
    onDestroy() {
        let parentChildrenContainer;
        if (this.#parent === null) {
            parentChildrenContainer = this.gameObject.scene._container._children;
        } else {
            parentChildrenContainer = this.#parent._children;
        }
        parentChildrenContainer.splice(parentChildrenContainer.indexOf(this), 1);
    }
}
