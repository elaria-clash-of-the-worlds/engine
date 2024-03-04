import SceneManager from "./SceneManager.js";

export default class Game {
    static instance;
    #deltaTime = 0;
    #activeScene;
    #canvas;

    constructor(canvasElement) {
        this.#activeScene = null;
        this.#canvas = canvasElement;
        this.#canvas.width = window.innerWidth;
        this.#canvas.height = window.innerHeight;

        // TODO Maybe it's bad and we should do it in other way
        const keydrownTag = document.createElement("script");
        keydrownTag.src = "/elaria/thirdparty/keydrown.js";
        document.head.appendChild(keydrownTag);
        Game.instance = this;
    }

    #startGameLoop() {
        const startLoopWhenKdLoaded = () => {
            if (typeof kd !== "undefined") {
                this.#startMainGameLoop();
            } else {
                window.requestAnimationFrame(startLoopWhenKdLoaded);
            }
        };

        startLoopWhenKdLoaded();
    }

    #startMainGameLoop() {
        let lastTime = performance.now();

        const gameLoop = (now) => {
            this.#update();
            this.#render();
            this.#deltaTime = (now - lastTime) / 1000.0;
            lastTime = now;

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
            Game.canvas.getContext("2d").clearRect(0, 0, Game.canvas.width, Game.canvas.height);
            this.#activeScene.render();
        }
    }

    static get canvas() {
        return Game.instance.#canvas;
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
