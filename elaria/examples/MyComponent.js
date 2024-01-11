import Component from "../core/Component.js";
import ElariaGame from "../core/ElariaGame.js";
import SceneManager from "../core/SceneManager.js";
import Debug from "../debug/Debug.js";

class MyComponent extends Component {
    #ctx;
    constructor() {
        super();
    }

    awake() {
        console.log("MyComponent : Awake");
        this.#ctx = ElariaGame.canvas.getContext("2d");
    }

    onEnable() {
        console.log("MyComponent : OnEnable");
    }

    start() {
        console.log("MyComponent : Start");
        console.log(Debug.getSceneHierarchy());
    }

    update(dt) {
        this.transform.position.x += 50 * dt;
        if (this.transform.position.x > 200) {
            this.transform.position.x = 0;
            SceneManager.loadScene(1);
        }
    }

    render() {
        this.#ctx.fillStyle = "red";
        this.#ctx.fillRect(this.gameObject.transform.position.x, this.gameObject.transform.position.y, 50, 50);
    }
}

export default MyComponent;