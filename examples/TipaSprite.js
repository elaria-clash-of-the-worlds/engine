import Component from "../core/Component.js";
import ElariaGame from "../core/ElariaGame.js";
import SceneManager from "../core/SceneManager.js";
import Debug from "../misc/Debug.js";

class TipaSprite extends Component
{
    #ctx;
    awake() {
        this.#ctx = ElariaGame.canvas.getContext("2d");
    }

    start() {
        console.log(Debug.getSceneHierarchy());
    }

    update(dt) {
        this.transform.position.y += 30 * dt;
        if (this.transform.position.y > 100) {
            this.transform.position.y = 0;
            SceneManager.loadScene(0);
        }
    }

    render() {
        this.#ctx.fillStyle = "green";
        this.#ctx.fillRect(this.gameObject.transform.position.x, this.gameObject.transform.position.y, 50, 50);
    }
}

export default TipaSprite;