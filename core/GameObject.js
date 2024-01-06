import Transform from "./Transform.js";
import Component from "./Component.js";
import transform from "./Transform.js";

class GameObject {
    constructor(name = "GameObject (new)") {
        this.components = [];
        this.name = name;
        this._activeSelf = true;
        this._awakeCalled = false;
        this._startCalled = false;
        this._onEnableCalled = false;
        this._onDisableCalled = false;
        this._transform = this.addComponent(Transform);
    }

    /**
     * The Transform attached to this GameObject.
     * @return {Transform} The value of the transform property.
     */
    get transform() {
        return this._transform;
    }

    /**
     * Whether the GameObject is active in the hierarchy or not.
     */
    get activeSelf() {
        return this._activeSelf;
    }

    _afterSceneLoaded() {
        for (const component of this.components) {
            component._afterSceneLoaded();
        }
    }

    _update(dt) {
        if (!this._awakeCalled) {
            this._awakeCalled = true;
            for (const component of this.components) {
                component.awake();
            }
        }

        if (this.activeSelf && !this._onEnableCalled) {
            this._onEnableCalled = true;
            for (const component of this.components) {
                component.onEnable();
            }
        }

        if (!this._startCalled) {
            this._startCalled = true;
            for (const component of this.components) {
                component.start();
            }
        } else {
            for (const component of this.components) {
                component.update(dt);
            }
        }

        if (!this.activeSelf && !this._onDisableCalled) {
            this._onDisableCalled = true;
            for (const component of this.components) {
                component.onDisable();
            }
        }
    }

    _render() {
        if (!this._startCalled || !this.activeSelf) {
            return;
        }

        for (const component of this.components) {
            component.render();
        }
    }

    /**
     * Activates/Deactivates the GameObject, depending on the given true or false value.
     */
    setActive(value) {
        if (this._activeSelf === value) {
            return;
        }

        this._activeSelf = value;

        if (value) {
            this._onEnableCalled = false;
            // Call OnEnable on all components and hierarchy children
        } else {
            this._onDisableCalled = false;
            // Call OnDisable on all components and hierarchy children
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
        newComponent.gameObject = this;
        newComponent.transform = this.transform;

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
}

export default GameObject;
