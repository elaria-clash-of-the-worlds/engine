import Component from "./Component.js";

export default class AudioSource extends Component {
    #audio = new Audio();

    get source() {
        return this.#audio.src;
    }

    set source(newSource) {
        this.#audio.src = newSource;
    }

    get loop() {
        return this.#audio.loop;
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

    clone() {
        const cloneAudioSource = super.clone();
        cloneAudioSource.source = this.source;
        cloneAudioSource.loop = this.loop;
        return cloneAudioSource;
    }
}