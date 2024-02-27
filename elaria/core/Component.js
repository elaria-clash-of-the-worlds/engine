class Component {
    _gameObject = null;
    _transform = null;

    /**
     * The transform component of the gameObject.
     *
     * @return {import("./Transform.js").Transform}
     */
    get transform() {
        return this._transform;
    }

    /**
     * The game object this component is attached to.
     *
     * @return {import("./GameObject.js").GameObject}
     */
    get gameObject() {
        return this._gameObject;
    }

    afterSceneLoaded() {
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

    render() {
    }
}

export default Component;
