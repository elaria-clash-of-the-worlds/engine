import Scene from "./Scene.js";

class SceneDescription {
    #sceneName;
    constructor(sceneName = "New Scene") {
        this._scene = null;
        this.#sceneName = sceneName;
    }

    build() {
    }

    create() {
        this._scene = new Scene(this.#sceneName);
        return this._scene;
    }
}

export default SceneDescription;
