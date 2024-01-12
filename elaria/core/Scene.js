import Transform from "./Transform.js";
import Vector2D from "./Vector2D.js";

class Scene {
    #name = "";
    constructor(name) {
        this.#name = name;
        this._gameObjects = [];
        this._container = {
            parent: null,
            position: Vector2D.zero,
            localPosition: Vector2D.zero,
            _children: [],
        };
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
