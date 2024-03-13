import Game from "./Game.js";

export default class Input {
    #pressedKeys = new Set();
    #downKeys = new Set();
    #upKeys = new Set();
    #mousePosition = { x: 0, y: 0 };
    #mouseDown = { 0: false, 1: false, 2: false };
    #mouseHold = { 0: false, 1: false, 2: false };
    #mouseUp = { 0: false, 1: false, 2: false };
    #scrollUp = false;
    #scrollDown = false;

    static #instance;

    constructor() {
        document.addEventListener("keydown", (e) => {
            if (!this.#pressedKeys.has(e.code)) {
                this.#downKeys.add(e.code);
                this.#pressedKeys.add(e.code);
            }
        });

        document.addEventListener("keyup", (e) => {
            this.#pressedKeys.delete(e.code);
            this.#upKeys.add(e.code);
        });

        Game.canvas.addEventListener("mousemove", (e) => {
            this.#mousePosition = this.getMousePos(Game.canvas, e);
        });

        Game.canvas.addEventListener("mousedown", (e) => {
            if (!this.#mouseHold[e.button]) {
                this.#mouseDown[e.button] = true;
                this.#mouseHold[e.button] = true;
            }
        });

        Game.canvas.addEventListener("mouseup", (e) => {
            this.#mouseDown[e.button] = false;
            this.#mouseHold[e.button] = false;
            this.#mouseUp[e.button] = true;
        });

        Game.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();
            if (e.deltaY < 0) {
                this.#scrollUp = true;
            } else {
                this.#scrollDown = true;
            }
        });

        Game.canvas.addEventListener("mousewheel", (e) => {
            e.preventDefault();
        });

        Game.canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); };

        Input.#instance = this;
    }

    getMousePos(canvas, evt) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    static update() {
        Input.#instance.#downKeys.clear();
        Input.#instance.#upKeys.clear();
        Input.#instance.#mouseDown = { left: false, middle: false, right: false };
        Input.#instance.#mouseUp = { left: false, middle: false, right: false };
        Input.#instance.#scrollUp = false;
        Input.#instance.#scrollDown = false;
    }

    static isKeyHold(keyCode) {
        return Input.#instance.#pressedKeys.has(keyCode);
    }

    static isKeyDown(keyCode) {
        return Input.#instance.#downKeys.has(keyCode);
    }

    static isKeyUp(keyCode) {
        return Input.#instance.#upKeys.has(keyCode);
    }

    static getMousePosition() {
        return Input.#instance.#mousePosition;
    }

    static isMouseDown(button) {
        return Input.#instance.#mouseDown[button];
    }

    static isMouseHold(button) {
        return Input.#instance.#mouseHold[button];
    }

    static isMouseUp(button) {
        return Input.#instance.#mouseUp[button];
    }

    static isScrollUp() {
        return Input.#instance.#scrollUp;
    }

    static isScrollDown() {
        return Input.#instance.#scrollDown;
    }
}