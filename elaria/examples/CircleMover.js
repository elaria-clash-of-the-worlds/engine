import Component from "../core/Component.js";
import Vector2D from "../core/Vector2D.js";

export default class CircleMover extends Component {
    #t = 0;
    constructor() {
        super();
        this.radius = 100;
        this.speed = 0.2;
    }

    update(dt) {
        let x = this.transform.parent.position.x;
        let y = this.transform.parent.position.y;

        this.transform.position = new Vector2D(x + Math.cos(this.#t * 2 * Math.PI) * this.radius, y + Math.sin(this.#t * 2 * Math.PI) * this.radius);

        this.#t += this.speed * dt;

        if (this.#t > 1.0) {
            this.#t = 0.0;
        }
    }
}