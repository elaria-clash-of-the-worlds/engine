import Component from "./Component.js";
import ElariaGame from "./ElariaGame.js";

export default class AudioSource extends Component {
    #audio = new Audio();

    set source(newSource) {
        this.#audio.src = newSource;
    }

    set loop(isLoop) {
        this.#audio.loop = isLoop;
    }

    get audio() {
        return this.#audio;
    }

    play() {
        this.#audio.play();
    }

    pause() {
        this.#audio.pause();
    }

    awake() {
    }

    render() {
    }
}