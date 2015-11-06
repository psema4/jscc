/*
 * RequireJS configuration for Node.
 */
requirejs.config({
    baseUrl: "./lib",
    paths: {
        "jscc/io/io": "jscc/io/ioNode",
        "jscc/log/log": "jscc/log/logNode",
        "jscc/bitset": "jscc/bitset/BitSet32"
    },
    nodeRequire: require,
    config: {
        "jscc/global": {
            "version": "0.38.0",
            "defaultDriver": "./bin/parser-driver.js"
        }
    }
});