class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static zero = Object.freeze(new Vector2D(0, 0));
    static one = Object.freeze(new Vector2D(1, 1));

    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

export default Vector2D;