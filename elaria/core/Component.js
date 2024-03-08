export default class Component {
    _gameObject = null;
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
