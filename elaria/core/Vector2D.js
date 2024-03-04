export default class Vector2D {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static zero = Object.freeze(new Vector2D(0, 0));
    static one = Object.freeze(new Vector2D(1, 1));

    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    setX(x) {
        return new Vector2D(x, this.y);
    }

    setY(y) {
        return new Vector2D(this.x, y);
    }

    /**
     * Divides the vector by a scalar value.
     *
     * @param {number} scalar - The scalar value to divide the vector by.
     * @returns {Vector2D} A new Vector2D representing the result of the division.
     */
    div(scalar) {
        if (scalar === 0) {
            throw new Error("Division by zero is not allowed.");
        }

        const resultX = this.x / scalar;
        const resultY = this.y / scalar;

        return new Vector2D(resultX, resultY);
    }

    /**
     * Rotates the vector by a given angle in radians.
     *
     * @param {number} angle - The angle in radians by which to rotate the vector.
     * @returns {Vector2D} A new Vector2D representing the rotated vector.
     */
    rotate(angle) {
        const cosAngle = Math.cos(angle);
        const sinAngle = Math.sin(angle);

        const rotatedX = this.x * cosAngle - this.y * sinAngle;
        const rotatedY = this.x * sinAngle + this.y * cosAngle;

        return new Vector2D(rotatedX, rotatedY);
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}