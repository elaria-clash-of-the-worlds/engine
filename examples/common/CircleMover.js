const {Vector2D, Component} = elaria;

export default class CircleMover extends Component {
    #t = 0;
    constructor() {
        super();
        this.radius = 100;
        this.speed = 0.2;
    }

    update(dt) {
        this.transform.localPosition = new Vector2D(Math.cos(this.#t * 2 * Math.PI) * this.radius, Math.sin(this.#t * 2 * Math.PI) * this.radius);

        this.#t += this.speed * dt;

        if (this.#t > 1.0) {
            this.#t = 0.0;
        }
    }

    clone() {
        const cloneCircleMover = super.clone();
        cloneCircleMover.radius = this.radius;
        cloneCircleMover.speed = this.speed;
        return cloneCircleMover;
    }
}