import Graphic from "./Graphic.js";
import Input from "./Input.js";

export default class Button extends Graphic {
    #image = new Image();
    #hoverImage = new Image();
    #pressedImage = new Image();
    #isHovered = false;
    #isPressed = false;
    onClick = null;

    constructor(imageSource, hoverImageSource, pressedImageSource) {
        super();

        this.#image.src = imageSource;
        this.#hoverImage.src = hoverImageSource;
        this.#pressedImage.src = pressedImageSource;
    }

    draw(ctx, x, y, w, h) {
        ctx.save();
        if (this.#isPressed) {
            // ctx.drawImage(this.#pressedImage, x, y, w, h);
            ctx.fillStyle = "blue";
        } else if (this.#isHovered) {
            // ctx.drawImage(this.#hoverImage, x, y, w, h);
            ctx.fillStyle = "red";
        } else {
            // ctx.drawImage(this.#image, x, y, w, h);
            ctx.fillStyle = "gray";
        }
        ctx.fillRect(x, y, w, h);
        ctx.restore();
    }

    update(dt) {
        const mousePos = Input.mousePosition;
        const rt = this.transform;
        const x = rt.localPositionX - rt.width * rt.pivot.x;
        const y = rt.localPositionY -rt.height * rt.pivot.y;
        if (mousePos.x > x && mousePos.x < x + rt.width && mousePos.y > y && mousePos.y < y + rt.height) {
            this.#isHovered = true;
            if (Input.isMouseDown(0))
            {
                this.#isPressed = true;
            }
            if (Input.isMouseUp(0)) {
                this.#isPressed = false;
                if (this.onClick) this.onClick();
            }
        } else {
            this.#isHovered = false;
            if (Input.isMouseUp(0)) {
                this.#isPressed = false;
            }
        }
    }

    onMouseDown() {
        this.#isPressed = true;
    }

    onMouseUp() {
        this.#isPressed = false;
    }
}