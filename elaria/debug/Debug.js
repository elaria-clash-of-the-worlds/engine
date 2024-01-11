import SceneManager from "../core/SceneManager.js";

class Debug {
    /**
     * Draws a hierarchy based on the given transform.
     *
     * @param {import("../core/Transform.js").Transform} transform - The transform object representing the hierarchy.
     */
    static getObjectHierarchy(transform) {
        const getHierarchyWithIndents = (transform, indent) => {
            const indentString = "-".repeat(indent * 2);
            let outputString = `${indentString}${transform.gameObject.name}\n`;
            for (const child of transform.children) {
                outputString += getHierarchyWithIndents(child, indent + 1);
            }
            return outputString;
        };

        return getHierarchyWithIndents(transform, 0);
    }

    static getSceneHierarchy() {
        if (SceneManager.activeScene === null || SceneManager.activeScene === undefined) {
            console.log("No active scene!");
        } else {
            let outputString = "";
            for (const child of SceneManager.activeScene._container.children) {
                outputString += Debug.getObjectHierarchy(child);
            }
            return outputString;
        }
    }
}

export default Debug;