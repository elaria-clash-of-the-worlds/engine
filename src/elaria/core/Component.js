export default class Component {
    /** @type {import("./GameObject.js").default} */
    _gameObject = null;
    /** @type {import("./Transform.js").default} */
    _transform = null;

    /**
     * The transform component of the gameObject.
     *
     * @return {import("./Transform.js").default | import("./RectTransform.js").default}
     */
    get transform() {
        return this._transform;
    }

    /**
     * The game object this component is attached to.
     *
     * @return {import("./GameObject.js").default}
     */
    get gameObject() {
        return this._gameObject;
    }

    /**
     * Adds a component to the GameObject.
     *
     * @template T
     *
     * @param {typeof T | T} component - the component to be added.
     * @param {Object} params - component parameters.
     * @return {T} - added component.
     */
    addComponent(component, params = {}) {
        return this._gameObject.addComponent(component, params);
    }

    /**
     * Retrieves a component of the specified type from the list of components.
     *
     * @template T
     * @param {typeof T} component - The type of component to retrieve.
     * @returns {T} - he component of the specified type, or undefined if not found.
     */
    getComponent(component) {
        return this._gameObject.getComponent(component);
    }

    /**
     * Removes a component from the list of components.
     *
     * @param {typeof Component} component - The component to be removed.
     */
    removeComponent(component) {
        return this._gameObject.removeComponent(component);
    }

    /**
     * Creates a new instance of Component.
     *
     * @return {Component}
     */
    clone() {
        return new this.constructor();
    }

    awake() {
    }

    start() {
    }

    onEnable() {
    }

    onDisable() {
    }

    onDestroy() {
    }

    // eslint-disable-next-line no-unused-vars
    update(dt) {
    }

    // eslint-disable-next-line no-unused-vars
    render(ctx) {
    }
}
