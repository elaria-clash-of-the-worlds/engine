export default class SpriteSheet {
    #frameWidth;
    #frameHeight;
    #framesCount;
    #columns;
    #startFrom;
    #frameIndex = 0;

    get frameWidth() {
        return this.#frameWidth;
    }

    set frameWidth(value) {
        this.#frameWidth = value;
    }

    get frameHeight() {
        return this.#frameHeight;
    }

    set frameHeight(value) {
        this.#frameHeight = value;
    }

    get framesCount() {
        return this.#framesCount;
    }

    set framesCount(value) {
        this.#framesCount = value;
    }

    get columns() {
        return this.#columns;
    }

    set columns(value) {
        this.#columns = value;
    }

    get startFrom() {
        return this.#startFrom;
    }

    set startFrom(value) {
        this.#startFrom = value;
    }

    get frameIndex() {
        return this.#frameIndex;
    }

    set frameIndex(value) {
        this.#frameIndex = value;
    }

    get isLastFrame() {
        return this.#frameIndex === this.#startFrom + this.#framesCount - 1;
    }

    get framePosX() {
        return (this.#frameIndex % this.#columns) * this.#frameWidth;
    }

    get framePosY() {
        return Math.floor(this.#frameIndex / this.#columns) * this.#frameHeight;
    }

    constructor(frameWidth, frameHeight, framesCount, columns, startFrom) {
        this.#frameWidth = frameWidth || 32;
        this.#frameHeight = frameHeight || 32;
        this.#framesCount = framesCount || 1;
        this.#columns = columns || 1;
        this.#startFrom = startFrom || 0;

        this.#frameIndex = this.#startFrom;
    }

    resetFramePosition() {
        this.#frameIndex = this.#startFrom;
    }

    prevFrame() {
        this.#frameIndex--;
        if (this.#frameIndex < this.#startFrom)
            this.#frameIndex = this.#startFrom + this.#framesCount - 1;
    }

    nextFrame() {
        this.#frameIndex++;
        if (this.#frameIndex >= this.#startFrom + this.#framesCount)
            this.#frameIndex = this.#startFrom;
    }

    clone() {
        return new SpriteSheet(
            this.#frameWidth,
            this.#frameHeight,
            this.#framesCount,
            this.#columns,
            this.#startFrom
        );
    }
}