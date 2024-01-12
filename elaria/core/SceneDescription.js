import Scene from "./Scene.js";
import GameObject from "./GameObject.js";

class SceneDescription {
    #sceneName;
    constructor(sceneName = "New Scene") {
        this._scene = null;
        this.#sceneName = sceneName;
    }

    createGameObject(name = "GameObject") {
        const gameObject = new GameObject();
        gameObject.name = name;
        this._scene._gameObjects.push(gameObject);
        return gameObject;
    }

    build() {
    }

    create() {
        this._scene = new Scene(this.#sceneName);
        return this._scene;
    }
}

export default SceneDescription;
