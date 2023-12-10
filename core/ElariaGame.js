import SceneManager from "./SceneManager.js";
import SceneDescription from "./SceneDescription.js";

class ElariaGame {
    constructor() {
        this._scenes = [];
        this._gameObjects = [];
    }

    #gameLoop(){
        window.requestAnimationFrame(this.#gameLoop.bind(this));
        this.#update();
    }

    #update() {
        for (const gameObject of this._gameObjects) {
            gameObject.update();
        }
    }

    registerScene(scene) {
        if (!(scene instanceof SceneDescription))
        {
            throw new Error("Scene must be an instance of SceneDescription");
        }
        this._scenes.push(scene);
    }
    
    start(sceneIndex) {
        if (sceneIndex < 0 || sceneIndex >= this._scenes.length) {
            throw new Error("Invalid scene index");
        }

        SceneManager._gameInstance = this;
        SceneManager.loadScene(sceneIndex);

        this.#gameLoop();
    }
}

export default ElariaGame;
