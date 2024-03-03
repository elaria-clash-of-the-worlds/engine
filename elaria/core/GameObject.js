import Transform from "./Transform.js";
import Component from "./Component.js";
import SceneManager from "./SceneManager.js";
import ElariaGame from "./ElariaGame.js";

class GameObject {
    #awakeCalled = false;
    #startCalled = false;
    #onEnableCalled = false;
    #onDisableCalled = false;

    #activeSelf = true;
    #isDestroyed = false;
    #transform;

    constructor(name) {
        this.name = name || "GameObject";

        this.components = [];
        this.#transform = this.addComponent(Transform);

        SceneManager.activeScene.addGameObject(this);
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

    get isDestroyed() {
        return this.#isDestroyed;
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

        if (!this.activeSelf && !this.#onDisableCalled) {
            this.#onDisableCalled = true;
            for (const component of this.components) {
                component.onDisable();
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
    }

    _render() {
        if (!this.#startCalled || !this.activeSelf) {
            return;
        }
        const context = ElariaGame.canvas.getContext("2d");
        context.save();
        let xFactor = 1;
        let yFactor = 1;
        if (this.transform.parent != null) {
            xFactor = this.transform.parent.localScale.x;
            yFactor = this.transform.parent.localScale.y;
        }
        context.translate(this.transform.localPosition.x / xFactor, this.transform.localPosition.y / yFactor);
        context.rotate(this.transform.localRotation);
        context.scale(this.transform.localScale.x, this.transform.localScale.y);
        for (const component of this.components) {
            component.render();
        }
        for (const transform of this.transform.children) {
            transform.gameObject._render();
        }
        context.restore();
    }

    _destroy() {
        for (const child of this.transform.children) {
            GameObject.destroy(child.gameObject);
        }
        for (const component of this.components) {
            if (this.activeSelf) {
                component.onDisable();
            }
            component.onDestroy();
        }
        this.#isDestroyed = true;
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
     * @param params - component parameters.
     * @return {Component} - The added component.
     */
    addComponent(component, params = {}) {
        let newComponent;
        if (!(component instanceof Component))
        {
            if (!(component.prototype instanceof Component)) {
                throw new Error("The added component must be an instance of Component.");
            }

            if (component.prototype instanceof Transform) {
                throw new Error("Transform always exists in a GameObject, you don't need to add it by yourself!");
            }

            newComponent = new component();
        } else {
            newComponent = component;
        }

        newComponent._gameObject = this;
        newComponent._transform = this.transform;

        for (const pk of Object.keys(params)) {
            if (pk in newComponent) {
                newComponent[pk] = params[pk];
            } else {
                console.log("Parameter <" + pk + "> is not a valid property of " + component.name + " component.");
            }
        }

        this.components.push(newComponent);
        return newComponent;
    }

    /**
     * Retrieves a component of the specified type from the list of components.
     *
     * @param {Object} component - The type of component to retrieve.
     * @return {Object} The component of the specified type, or undefined if not found.
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

    toString() {
        let result = `GameObject: ${this.name}\n`;
        result += `Active: ${this.activeSelf}\n`;
        result += `Destroyed: ${this.isDestroyed}\n`;

        // Display components
        result += "Components:\n";
        for (const component of this.components) {
            result += `- ${component.constructor.name}\n`;
        }

        // Display children
        result += "Children:";
        for (const childTransform of this.transform.children) {
            const childGameObject = childTransform.gameObject;
            result += `\n- ${childGameObject.name}`;
        }
        if (this.transform.children.length === 0) {
            result += " None\n";
        }

        return result;
    }

    static instantiate(original, parent = null) {
        if (!(original instanceof GameObject)) {
            throw new Error("Only GameObjects can be instantiated!");
        }

        const cloneObject = new GameObject(original.name + "_clone");

        for (const originalComponent of original.components) {
            if (originalComponent instanceof Transform) {
                continue;
            }

            cloneObject.addComponent(originalComponent.clone());
        }

        cloneObject.transform.position = original.transform.position;
        cloneObject.transform.rotation = original.transform.rotation;
        cloneObject.transform.localScale = original.transform.localScale;

        // Set the parent for the clone transform
        if (parent instanceof Transform) {
            cloneObject.transform.parent = parent;
        }

        // Recursively instantiate children
        for (const child of original.transform.children) {
            GameObject.instantiate(child.gameObject, cloneObject.transform);
        }

        return cloneObject;
    }

    static destroy(gameObject) {
        if (!(gameObject instanceof GameObject)) {
            throw new Error("Only gameObjects can be destroyed!");
        }
        SceneManager.activeScene.removeGameObject(gameObject);
        gameObject._destroy();
    }

    static dontDestroyOnLoad(gameObject) {

    }
}

export default GameObject;
