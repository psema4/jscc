/*
 * RequireJS configuration for Rhino.
 */
requirejs.config({
    baseUrl: "./lib",
    paths: {
        "jscc/io/io": "jscc/io/ioRhino",
        "jscc/log/log": "jscc/log/logJava",
        "jscc/bitset": "jscc/bitset/BitSetJava",
        "text": "../bin/text"
    },
    nodeRequire: require,
    config: {
        "jscc/global": {
            "version": "0.39.0"
        },
        "env": "rhino"
    }
});
