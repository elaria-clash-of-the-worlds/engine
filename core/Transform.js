import Component from "./Component.js";
import Scene from "./Scene.js";
import Vector2D from "./Vector2D.js";

class Transform extends Component {

    constructor() {
        super();
        this._children = [];
        this._parent = null;
        this.position = Vector2D.zero;
        this.rotation = 0;
    }

    /**
     * Get the children of the Transform.
     */
    get children() {
        return this._children;
    }

    /**
     * Returns the parent of the Transform.
     */
    get parent() {
        if (this._parent instanceof Scene) {
            return null;
        }
        return this._parent;
    }

    /**
     * Sets the parent of the current object.
     *
     * @param {Transform} parent - the parent object to set.
     * @throws {Error} Throws an error if the parent is not an instance of Transform.
     */
    setParent(parent) {
        if (parent === null || parent === undefined) {
            if (this.parent === null) {
                return;
            }
            // Set the scene container as parent
            return;
        }

        if (!(parent instanceof Transform)) {
            throw new Error("Parent must be an instance of Transform");
        }

        if (parent._children.includes(this)) {
            return;
        }

        this._parent = parent;
        parent._children.push(this);
    }

    setSiblingIndex(index) {
        const parentChildren = this._parent._children;
        if (index < 0 || index >= parentChildren.length) {
            throw new Error(`Invalid sibling index - ${index}! The object has ${parentChildren.length} children.`);
        }
        const child = parentChildren.splice(parentChildren.indexOf(this), 1)[0];
        parentChildren.splice(index, 0, child);
    }

    getSiblingIndex() {
        return this._parent._children.indexOf(this);
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
