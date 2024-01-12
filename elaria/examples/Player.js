import Component from "../core/Component.js";
import Vector2D from "../core/Vector2D.js";
import Debug from "../debug/Debug.js";

export default class Player extends Component {

    constructor() {
        super();
        this.velocity = new Vector2D(0, 0);
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

        this.transform.position = this.transform.position.add(new Vector2D(this.velocity.x * dt, this.velocity.y * dt));

        this.velocity.x *= 0.95;
        this.velocity.y *= 0.95;
    }
};