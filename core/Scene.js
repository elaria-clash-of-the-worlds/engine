import Transform from "./Transform.js";

class Scene {
    #name = "";
    constructor(name) {
        this.#name = name;
        this._gameObjects = [];
        this._container = new Transform();
    }

    /**
     * Get the scene name.
     *
     * @return {string} The value of the name property.
     */
    get name() {
        return this.#name;
    }

    _update(dt) {
        for (const gameObject of this._gameObjects) {
            gameObject._update(dt);
        }
    }

    _render() {
        for (const gameObject of this._gameObjects) {
            gameObject._render();
        }
    }

    _onDestroy() {
        for (const gameObject of this._gameObjects) {
            gameObject._onDestroy();
        }
    }
}

export default Scene;
