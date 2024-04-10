const path = require("path");

module.exports = {
    entry: "./src/elaria/Elaria.js",
    output: {
        filename: "elaria.js",
        path: path.resolve(__dirname, "library"),
        globalObject: "this",
        library: {
            name: "elaria",
            type: "umd",
        },
    },
};