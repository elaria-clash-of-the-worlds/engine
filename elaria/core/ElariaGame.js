import SceneManager from "./SceneManager.js";
import Scene from "./Scene.js";

class ElariaGame {
    static instance;
    static deltaTime = 0;
    #activeScene;
    #canvas;

    constructor(canvasElement) {
        this.#canvas = canvasElement;
        this.#activeScene = null;

        ElariaGame.instance = this;

        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;
    }

    #startGameLoop() {
        let lastTime = performance.now();

        const gameLoop = (now) => {
            this.#update();
            this.#render();
            ElariaGame.deltaTime = (now - lastTime) / 1000.0;
            lastTime = now;
            kd.tick();

            window.requestAnimationFrame(gameLoop);
        };

        window.requestAnimationFrame(gameLoop);
    }

    #update() {
        if (this.#activeScene) {
            this.#activeScene._update(ElariaGame.deltaTime);
        }

        if (this.#activeScene !== SceneManager.activeScene) {
            if (this.#activeScene != null)
                this.#activeScene._onDestroy();

            this.#activeScene = SceneManager.activeScene;
            this.#activeScene._afterSceneLoaded();
        }
    }

    #render() {
        if (this.#activeScene) {
            ElariaGame.canvas.getContext("2d").clearRect(0, 0, ElariaGame.canvas.width, ElariaGame.canvas.height);
            this.#activeScene._render();
        }
    }

    static get canvas() {
        return ElariaGame.instance.#canvas;
    }

    start(sceneIndex) {
        if (sceneIndex) {
            SceneManager.loadScene(sceneIndex);
        } else {
            SceneManager.loadScene(0);
        }
        this.#startGameLoop();
    }
}

export default ElariaGame;
