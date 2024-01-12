import Component from "../core/Component.js";
import Vector2D from "../core/Vector2D.js";
import Debug from "../debug/Debug.js";
import ElariaGame from "../core/ElariaGame.js";
import AudioSource from "../core/AudioSource.js";

export default class Player extends Component {
    static MAX_SPEED = 500;

    constructor() {
        super();
        this.velocity = new Vector2D(0, 0);
        this.acceleration = 10;
        this.friction = 0.95;
    }

    start() {
        console.log(Debug.getSceneHierarchy());
    }

    update(dt) {
        kd.SHIFT.down(() => {
            this.acceleration += this.acceleration * dt;
        });

        kd.W.down(() => {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.y -= this.acceleration;
        });

        kd.A.down(() => {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.x -= this.acceleration;
        });

        kd.S.down(() => {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.y += this.acceleration;
        });

        kd.D.down(() => {
            if (this.velocity.length <= Player.MAX_SPEED)
                this.velocity.x += this.acceleration;
        });

        kd.SPACE.down(() => {
            this.gameObject.getComponent(AudioSource).play();
        });

        this.transform.position = this.transform.position.add(new Vector2D(this.velocity.x * dt, this.velocity.y * dt));

        this.velocity.x *= this.friction;
        this.velocity.y *= this.friction;
    }
};