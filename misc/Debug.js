class Debug {
    /**
     * Draws a hierarchy based on the given transform.
     *
     * @param {Transform} transform - The transform object representing the hierarchy.
     */
    static drawHierarchy(transform) {
        const drawWithIndents = (transform, indent) => {
            const indentString = "-".repeat(indent * 2);
            let outputString = `${indentString}${transform.gameObject.name}\n`;
            for (const child of transform.children) {
                outputString += drawWithIndents(child, indent + 1);
            }
            return outputString;
        };

        return drawWithIndents(transform, 0);
    }
}

export default Debug;