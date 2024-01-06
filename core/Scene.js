import Transform from "./Transform.js";

class Scene {
    constructor() {
        this._gameObjects = [];
        this._container = new Transform();
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
}

export default Scene;
