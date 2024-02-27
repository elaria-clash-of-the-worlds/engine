import Transform from "./Transform.js";
import Component from "./Component.js";
import SceneManager from "./SceneManager.js";

class GameObject {
    #activeSelf = true;
    #awakeCalled = false;
    #startCalled = false;
    #onEnableCalled = false;
    #onDisableCalled = false;
    #transform;

    constructor(name) {
        this.name = "GameObject";
        if (name)
            this.name = name;

        this.components = [];
        this.#transform = this.addComponent(Transform);

        SceneManager.activeScene._gameObjects.push(this);
    }

    /**
     * The Transform attached to this GameObject.
     * @return {import("./Transform.js").Transform} The value of the transform property.
     */
    get transform() {
        return this.#transform;
    }

    /**
     * Whether the GameObject is active in the hierarchy or not.
     *
     * @return {boolean}
     */
    get activeSelf() {
        return this.#activeSelf;
    }

    _afterSceneLoaded() {
        for (const component of this.components) {
            component.afterSceneLoaded();
        }
    }

    _update(dt) {
        if (!this.#awakeCalled) {
            this.#awakeCalled = true;
            for (const component of this.components) {
                component.awake();
            }
        }

        if (this.activeSelf && !this.#onEnableCalled) {
            this.#onEnableCalled = true;
            for (const component of this.components) {
                component.onEnable();
            }
        }

        if (!this.#startCalled) {
            this.#startCalled = true;
            for (const component of this.components) {
                component.start();
            }
        } else {
            for (const component of this.components) {
                component.update(dt);
            }
        }

        if (!this.activeSelf && !this.#onDisableCalled) {
            this.#onDisableCalled = true;
            for (const component of this.components) {
                component.onDisable();
            }
        }
    }

    _render() {
        if (!this.#startCalled || !this.activeSelf) {
            return;
        }

        for (const component of this.components) {
            component.render();
        }
    }

    _onDestroy() {
        for (const component of this.components) {
            if (this.activeSelf) {
                component.onDisable();
            }
            component.onDestroy();
        }
    }

    /**
     * Sets the active state of the GameObject.
     * @param {boolean} value - The desired active state (true for active, false for inactive).
     */
    setActive(value) {
        if (this.#activeSelf === value) {
            return;
        }

        this.#activeSelf = value;

        if (value) {
            this.#onEnableCalled = false;
        } else {
            this.#onDisableCalled = false;
        }
    }

    /**
     * Adds a component to the GameObject.
     *
     * @param component - the component to be added.
     * @return {Component} - The added component.
     */
    addComponent(component) {
        if (!(component.prototype instanceof Component)) {
            throw new Error("The added component must be an instance of Component.");
        }

        if (component.prototype instanceof Transform) {
            throw new Error("Transform always exists in a GameObject, you don't need to add it by yourself!");
        }

        const newComponent = new component();
        newComponent._gameObject = this;
        newComponent._transform = this.transform;

        this.components.push(newComponent);
        return newComponent;
    }

    /**
     * Retrieves a component of the specified type from the list of components.
     *
     * @param {Component} component - The type of component to retrieve.
     * @return {Component} The component of the specified type, or undefined if not found.
     */
    getComponent(component) {
        return this.components.find(c => c instanceof component);
    }

    /**
     * Removes a component from the list of components.
     *
     * @param {Object} component - The component to be removed.
     */
    removeComponent(component) {
        if (component.prototype instanceof Transform) {
            console.log("Transform component cannot be removed!");
            return;
        }

        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] instanceof component) {
                this.components.splice(i, 1);
                return;
            }
        }
    }

    static instantiate() {

    }

    static dontDestroyOnLoad(gameObject) {

    }

    /**
     * The method is invoked when the game object is clicked.
     */
    onClick() {
    }
}

export default GameObject;
