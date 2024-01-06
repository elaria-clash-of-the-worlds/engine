import Scene from "./Scene.js";
import GameObject from "./GameObject.js";

class SceneDescription {
    constructor() {
        this._scene = null;
    }

    createGameObject(name = "GameObject (new)") {
        const gameObject = new GameObject(name);
        this._scene._gameObjects.push(gameObject);
        return gameObject;
    }

    build() {
    }

    create() {
        this._scene = new Scene();
        this.build();
        return this._scene;
    }
}

export default SceneDescription;
