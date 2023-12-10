import GameObject from "./GameObject.js";
import Scene from "./Scene.js";

class SceneDescription {
    constructor () {
        this._gameObjects = [];
        this._scene = new Scene();
    }

    instantiate (transform=null) {
        const gameObject = new GameObject();
        gameObject.transform.setParent(transform);
        this._gameObjects.push(gameObject);
        this._scene._gameObjects.push(gameObject);
        return gameObject;
    }

    create () {
        return this._scene;
    }
}

export default SceneDescription;
