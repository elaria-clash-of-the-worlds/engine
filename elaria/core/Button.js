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

        // Вычисляем координаты вершин прямоугольника после поворота
        const rotatedVertices = this.getRotatedVertices(rt);

        // Проверяем, находится ли курсор мыши внутри повернутого прямоугольника
        if (this.isPointInsideRotatedRect(mousePos, rotatedVertices)) {
            this.#isHovered = true;
            if (Input.isMouseDown(0)) {
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

    // Метод для вычисления координат вершин прямоугольника после поворота
    getRotatedVertices(transform) {
        const vertices = [];

        // Вычисляем координаты вершин прямоугольника без поворота
        const x = transform.localPositionX - transform.width * transform.pivot.x;
        const y = transform.localPositionY - transform.height * transform.pivot.y;
        const w = transform.width;
        const h = transform.height;

        // Вычисляем угол поворота в радианах
        const angle = (transform.localRotation || transform.rotation) * Math.PI / 180;

        // Вычисляем координаты повернутых вершин
        const centerX = x + w / 2;
        const centerY = y + h / 2;
        const sinA = Math.sin(angle);
        const cosA = Math.cos(angle);

        vertices.push([
            centerX + (x - centerX) * cosA - (y - centerY) * sinA,
            centerY + (x - centerX) * sinA + (y - centerY) * cosA
        ]);
        vertices.push([
            centerX + (x + w - centerX) * cosA - (y - centerY) * sinA,
            centerY + (x + w - centerX) * sinA + (y - centerY) * cosA
        ]);
        vertices.push([
            centerX + (x + w - centerX) * cosA - (y + h - centerY) * sinA,
            centerY + (x + w - centerX) * sinA + (y + h - centerY) * cosA
        ]);
        vertices.push([
            centerX + (x - centerX) * cosA - (y + h - centerY) * sinA,
            centerY + (x - centerX) * sinA + (y + h - centerY) * cosA
        ]);

        return vertices;
    }

    // Метод для определения, находится ли точка внутри повернутого прямоугольника
    isPointInsideRotatedRect(point, vertices) {
        let i, j, c = false;
        const verticesCount = vertices.length;
        for (i = 0, j = verticesCount - 1; i < verticesCount; j = i++) {
            if (((vertices[i][1] > point.y) !== (vertices[j][1] > point.y)) &&
                (point.x < (vertices[j][0] - vertices[i][0]) * (point.y - vertices[i][1]) / (vertices[j][1] - vertices[i][1]) + vertices[i][0])) {
                c = !c;
            }
        }
        return c;
    }

    onMouseDown() {
        this.#isPressed = true;
    }

    onMouseUp() {
        this.#isPressed = false;
    }
}