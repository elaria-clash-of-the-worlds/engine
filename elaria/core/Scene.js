import Vector2D from "./Vector2D.js";

class Scene {
    #name = "";
    #gameObjects = [];

    constructor(name) {
        this.#name = name;
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

    addGameObject(gameObject) {
        this.#gameObjects.push(gameObject);
    }

    removeGameObject(gameObject) {
        const index = this.#gameObjects.indexOf(gameObject);
        if (index > -1) {
            this.#gameObjects.splice(index, 1);
        }
    }

    update(dt) {
        for (const gameObject of this.#gameObjects) {
            gameObject._update(dt);
        }
    }

    render() {
        for (const gameObject of this.#gameObjects) {
            gameObject._render();
        }
    }

    destroy() {
        for (const gameObject of this.#gameObjects) {
            gameObject._destroy();
        }
    }
}

export default Scene;
