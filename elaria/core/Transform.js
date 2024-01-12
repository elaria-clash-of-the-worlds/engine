import Component from "./Component.js";
import Vector2D from "./Vector2D.js";
import SceneManager from "./SceneManager.js";

class Transform extends Component {
    #parent;

    constructor() {
        super();
        this._children = [];
        this.#parent = null;
        this.localPosition = Vector2D.zero;
        this.rotation = 0;
        this.setParent(null);
    }

    get position() {
        // For Scene container
        if (this.#parent == null) {
            return Vector2D.zero;
        }

        return this.#parent.position.add(this.localPosition);
    }

    set position(newPosition) {
        this.localPosition = newPosition.sub(this.#parent.position);
    }

    /**
     * Get the children of the Transform.
     */
    get children() {
        return this._children;
    }

    /**
     * Returns the parent of the current object.
     *
     * @return {Transform} The parent of the current object, or null if the current object is the root parent.
     */
    get parent() {
        if (this.#parent === SceneManager.activeScene._container) {
            return null;
        }
        return this.#parent;
    }

    /**
     * Sets the parent of the current object.
     *
     * @param {Transform} newParent - the parent object to set.
     * @throws {Error} Throws an error if the parent is not an instance of Transform.
     */
    setParent(newParent) {
        if (this.#parent != null) {
            this.#parent._children.splice(this.#parent._children.indexOf(this), 1);
        }

        if (!newParent) {
            const previousPosition = this.position;
            this.#parent = SceneManager.activeScene._container;
            this.#parent._children.push(this);
            this.position = previousPosition;
            return;
        }

        if (!(newParent instanceof Transform)) {
            throw new Error("Parent must be an instance of Transform");
        }

        if (!newParent._children.includes(this)) {
            const previousPosition = this.position;
            this.#parent = newParent;
            this.position = previousPosition;
            newParent._children.push(this);
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
     * @param childIndex - index of the child
     * @returns {Transform}
     */
    getChild(childIndex) {
        if (childIndex < 0 || childIndex >= this._children.length) {
            throw new Error(`Invalid child index - ${childIndex}! The object has ${this._children.length} children.`);
        }
        return this._children[childIndex];
    }
}

export default Transform;
