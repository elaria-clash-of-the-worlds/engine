import Component from "../core/Component.js";
import ElariaGame from "../core/ElariaGame.js";
import SceneManager from "../core/SceneManager.js";

class TipaSprite extends Component
{
    #ctx;
    awake() {
        this.#ctx = ElariaGame.canvas.getContext("2d");
    }

    update(dt) {
        console.log("MyComponent : Update");

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