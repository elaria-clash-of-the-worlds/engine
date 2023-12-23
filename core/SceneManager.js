import SceneDescription from "./SceneDescription.js";

class SceneManager {
    static _gameInstance;
    static #scenes = [];
    static #activeScene;

    static get activeScene() {
        return this.#activeScene;
    }

    static registerScene(scene) {
        if (!(scene instanceof SceneDescription)) {
            throw new Error("Scene must be an instance of SceneDescription");
        }
        this.#scenes.push(scene);
    }

    static loadScene(sceneIndex) {
        if (sceneIndex < 0 || sceneIndex >= this.#scenes.length) {
            throw new Error("Invalid scene index");
        }
        this.#activeScene = this.#scenes[sceneIndex].create();
    }
}

export default SceneManager;
