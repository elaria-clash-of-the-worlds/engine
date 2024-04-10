import SceneManager from "./SceneManager.js";
import Input from "../input/Input.js";

export default class Game {
    static #instance;
    #deltaTime = 0;
    #activeScene;
    #canvas;
    #needToResize;
    #input;
    #fps;

    get fps() {
        return this.#fps;
    }

    constructor(canvasElement) {
        this.#activeScene = null;
        this.#canvas = canvasElement;
        this.#canvas.width = this.#canvas.clientWidth;
        this.#canvas.height = this.#canvas.clientHeight;

        const canvasResizeObserver = new ResizeObserver(() => {
            this.#needToResize = true;
        });
        canvasResizeObserver.observe(this.#canvas);

        Game.#instance = this;
    }

    /**
     * The instance of the Game.
     * @returns {Game}
     */
    static get instance() {
        return Game.#instance;
    }

    #startGameLoop() {
        this.#startMainGameLoop();
    }

    #startMainGameLoop() {
        let lastTime = performance.now();

        const gameLoop = (now) => {
            this.#update();
            this.#render();
            this.#deltaTime = (now - lastTime) / 1000;
            lastTime = now;
            this.#fps = 1 / this.#deltaTime;

            window.requestAnimationFrame(gameLoop);
        };

        window.requestAnimationFrame(gameLoop);
    }

    #update() {
        if (this.#activeScene) {
            this.#activeScene.update(this.#deltaTime);
            Input.update();
        }

        if (this.#activeScene !== SceneManager.activeScene) {
            if (this.#activeScene != null)
                this.#activeScene.destroy();

            this.#activeScene = SceneManager.activeScene;
        }
    }

    #render() {
        if (this.#activeScene) {
            if (this.#needToResize) {
                this.#canvas.width = this.#canvas.clientWidth;
                this.#canvas.height = this.#canvas.clientHeight;
                this.#needToResize = false;
            } else {
                const {width, height} = this.#canvas;
                this.#canvas.getContext("2d").clearRect(0, 0, width, height);
            }
            this.#activeScene.render();
        }
    }

    /**
     * The canvas element of the game.
     * @returns {HTMLCanvasElement}
     */
    static get canvas() {
        return Game.#instance.#canvas;
    }

    start(sceneIndex) {
        if (sceneIndex) {
            SceneManager.loadScene(sceneIndex);
        } else {
            SceneManager.loadScene(0);
        }
        this.#input = new Input();
        this.#startGameLoop();
    }
}
