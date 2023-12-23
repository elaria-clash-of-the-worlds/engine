class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static zero = new Vector2D(0, 0);
    static one = new Vector2D(1, 1);

    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

export default Vector2D;