class SceneManager {
    static _gameInstance;
    static loadScene (sceneIndex) {
        SceneManager._gameInstance._scenes[sceneIndex].create();
        this._gameInstance._gameObjects = SceneManager._gameInstance._scenes[sceneIndex]._gameObjects;
    }
}

export default SceneManager;
