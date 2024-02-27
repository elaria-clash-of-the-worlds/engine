import Component from "../core/Component.js";
import Vector2D from "../core/Vector2D.js";
import Debug from "../debug/Debug.js";
import AudioSource from "../core/AudioSource.js";
import SceneManager from "../core/SceneManager.js";

export default class Player extends Component {
    static MAX_SPEED = 500;
    static MIN_ACCELERATION = 10;

    constructor() {
        super();
        this.velocity = new Vector2D(0, 0);
        this.acceleration = Player.MIN_ACCELERATION;
        this.friction = 0.95;
        this.delay = 0;
        this.loadSceneIndex = 0;
    }

    start() {
        console.log(Debug.getSceneHierarchy());
    }

    update(dt) {
        this.acceleration = Math.max(Player.MIN_ACCELERATION, this.acceleration + (kd.SHIFT.isDown() ? 1 : -1) * this.acceleration * dt);

        if (kd.W.isDown()) {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.y -= this.acceleration;
        }

        if (kd.A.isDown()) {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.x -= this.acceleration;
        }

        if (kd.S.isDown()) {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.y += this.acceleration;
        }

        if (kd.D.isDown()) {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.x += this.acceleration;
        }

        if (kd.SPACE.isDown()) {
            this.gameObject.getComponent(AudioSource).play();
        }

        if (kd.H.isDown()) {
            this.delay += dt;
            if (this.delay > 0.5) {
                SceneManager.loadScene(this.loadSceneIndex);
            }
        } else {
            this.delay = 0;
        }

        this.transform.position = this.transform.position.add(new Vector2D(this.velocity.x * dt, this.velocity.y * dt));

        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
    }
};