import Component from "../core/Component.js";
import ElariaGame from "../core/ElariaGame.js";
import Sprite from "../core/Sprite.js";
import Vector2D from "../core/Vector2D.js";
import Debug from "../debug/Debug.js";

export default class Player extends Component {
    #ctx;

    constructor() {
        super();
        this.velocity = new Vector2D(0, 0);
        this.sprite = new Sprite("https://mosnapitki.ru/images/cms/thumbs/8c856c34813e8e6eaa248115eef774bea5ffd7a1/sprite_lemon_lime_330ml__535_535_1_100.jpg");
    }

    awake() {
        this.#ctx = ElariaGame.canvas.getContext("2d");
    }

    start() {
        console.log(Debug.getSceneHierarchy());
    }

    update(dt) {
        const acceleration = 10;

        kd.W.down(() => {
            this.velocity.y -= acceleration;
        });

        kd.A.down(() => {
            this.velocity.x -= acceleration;
        });

        kd.S.down(() => {
            this.velocity.y += acceleration;
        });

        kd.D.down(() => {
            this.velocity.x += acceleration;
        });

        this.transform.position.x += this.velocity.x * dt;
        this.transform.position.y += this.velocity.y * dt;

        this.velocity.x *= 0.95;
        this.velocity.y *= 0.95;
    }

    render() {
        this.#ctx.fillStyle = "green";
        this.#ctx.drawImage(this.sprite.image, this.gameObject.transform.position.x, this.gameObject.transform.position.y);
    }
};