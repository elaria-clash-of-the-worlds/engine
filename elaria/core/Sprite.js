import Component from "./Component.js";
import ElariaGame from "./ElariaGame.js";

export default class Sprite extends Component{
    #ctx;
    #image = new Image();

    get imageSource() {
        return this.#image.src;
    }

    set imageSource(imageSource) {
        this.#image.src = imageSource;
    }

    get image() {
        return this.#image;
    }

    awake() {
        this.#ctx = ElariaGame.canvas.getContext("2d");
    }

    render() {
        this.#ctx.fillStyle = "green";
        this.#ctx.drawImage(this.#image, this.transform.position.x, this.transform.position.y);
    }
}