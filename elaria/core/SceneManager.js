import SceneDescription from "./SceneDescription.js";

class SceneManager {
    static _gameInstance;
    static #scenes = [];
    static #activeScene;

    /**
     * Get the active scene.
     *
     * @return {import("./Scene.js").Scene} The active scene.
     */
    static get activeScene() {
        return this.#activeScene;
    }

    /**
     * Registers a scene.
     *
     * @param {SceneDescription} scene - The scene to register.
     * @throws {Error} If the scene is not an instance of SceneDescription.
     */
    static registerScene(scene) {
        if (!(scene instanceof SceneDescription)) {
            throw new Error("Scene must be an instance of SceneDescription");
        }
        this.#scenes.push(scene);
    }

    /**
     * Loads a scene based on the given scene index.
     *
     * @param {number} sceneIndex - The index of the scene to load.
     * @throws {Error} If the scene index is invalid.
     */
    static loadScene(sceneIndex) {
        if (sceneIndex < 0 || sceneIndex >= this.#scenes.length) {
            throw new Error("Invalid scene index");
        }
        document.removeEventListener('keyup', this.#activeScene?.keyHandler);
        document.removeEventListener('keydown', this.#activeScene?.keyHandler);

        this.#activeScene = this.#scenes[sceneIndex].create();

        document.addEventListener('keyup', this.#activeScene.keyHandler);
        document.addEventListener('keydown', this.#activeScene.keyHandler);

        for (const go of this.#activeScene._gameObjects) {
            go._afterSceneLoaded();
        }
    }
}

export default SceneManager;
