class Scene {
    constructor() {
        this._gameObjects = [];
    }

    update(dt) {
        for (const gameObject of this._gameObjects) {
            gameObject.update(dt);
        }
    }

    render() {
        for (const gameObject of this._gameObjects) {
            gameObject.render();
        }
    }
}

export default Scene;
