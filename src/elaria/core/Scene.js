import Vector2D from "../types/Vector2D.js";

export default class Scene {
    #name = "";
    #gameObjects = [];

    constructor(name) {
        this.#name = name;
        this._container = {
            parent: null,
            position: Vector2D.zero,
            rotation: 0,
            localRotation: 0,
            localPosition: Vector2D.zero,
            localScale: Vector2D.one,
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
        for (const transform of this._container._children) {
            transform.gameObject._render();
        }
    }

    destroy() {
        for (const gameObject of this.#gameObjects) {
            gameObject._destroy();
        }
    }
}
