export default class Sprite {
    #image;

    constructor(source) {
        this.#image = new Image();
        this.#image.src = source;
    }

    get image() {
        return this.#image;
    }
}