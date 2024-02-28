import SceneManager from "./SceneManager.js";

class ElariaGame {
    static instance;
    #deltaTime = 0;
    #activeScene;
    #canvas;

    constructor(canvasElement) {
        this.#activeScene = null;
        this.#canvas = canvasElement;
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;

        ElariaGame.instance = this;
    }

    #startGameLoop() {
        let lastTime = performance.now();

        const gameLoop = (now) => {
            this.#update();
            this.#render();
            this.#deltaTime = (now - lastTime) / 1000.0;
            lastTime = now;
            // eslint-disable-next-line no-undef
            kd.tick();

            window.requestAnimationFrame(gameLoop);
        };

        window.requestAnimationFrame(gameLoop);
    }

    #update() {
        if (this.#activeScene) {
            this.#activeScene.update(this.#deltaTime);
        }

        if (this.#activeScene !== SceneManager.activeScene) {
            if (this.#activeScene != null)
                this.#activeScene.destroy();

            this.#activeScene = SceneManager.activeScene;
        }
    }

    #render() {
        if (this.#activeScene) {
            ElariaGame.canvas.getContext("2d").clearRect(0, 0, ElariaGame.canvas.width, ElariaGame.canvas.height);
            this.#activeScene.render();
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
