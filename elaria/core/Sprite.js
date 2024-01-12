import Component from "./Component.js";
import ElariaGame from "./ElariaGame.js";

export default class Sprite extends Component {
    #ctx;
    #image = new Image();

    set imageSource(imageSource) {
        this.#image.src = imageSource;
    }

    get image() {
        return this.#image;
    }

    set width(newWidth) {
        this.#image.width = newWidth;
    }

    set height(newHeight) {
        this.#image.height = newHeight;
    }

    awake() {
        this.#ctx = ElariaGame.canvas.getContext("2d");
    }

    render() {
        this.#ctx.fillStyle = "green";
        this.#ctx.drawImage(this.#image, this.transform.position.x - this.#image.width / 2, this.transform.position.y - this.#image.height / 2, this.#image.width, this.#image.height);
    }
}