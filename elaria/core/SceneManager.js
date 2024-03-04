import SceneDescription from "./SceneDescription.js";

export default class SceneManager {
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

        this.#activeScene = this.#scenes[sceneIndex].create();
        this.#scenes[sceneIndex].build();
    }
}
