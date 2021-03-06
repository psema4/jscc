suite("regex", function() {
    var path = require('path');
    if (typeof requirejs === 'undefined') {
        requirejs = require('requirejs');
        requirejs.config({
                             baseUrl: path.join(__dirname, '../../lib/jscc'),
                             nodeRequire: require,
                             packages: [
                                 {
                                     name: "squirejs",
                                     location: "../../node_modules/squirejs",
                                     main: "src/Squire"
                                 }
                             ],
                             paths: {
                                 "sinon": "../../node_modules/sinon/pkg/sinon",
                                 "text": "../../node_modules/requirejs-text/text",
                                 "has": "../../volo/has"
                             },
                             map: {
                                 "*": {
                                     "log/log": "log/logNode",
                                     "io/io": "io/ioNode",
                                     "bitset": "bitset/BitSet32"
                                 }
                             }
                         });
    }

    var sinon = requirejs('sinon');
    var chai = requirejs('chai');
    var Squire = requirejs('squirejs');

    sinon.assert.expose(chai.assert, { prefix: "" });
    var assert = chai.assert;
    var injector = new Squire();

    var sandbox;
    setup("setup", function() {
        injector.configure();
        sandbox = sinon.sandbox.create();
        var logStub = sandbox.stub({
                                       fatal: function(msg) {
                                       },
                                       error: function(msg) {
                                       },
                                       warn: function(msg) {
                                       },
                                       info: function(msg) {
                                       },
                                       debug: function(msg) {
                                       },
                                       trace: function(msg) {
                                       },
                                       setLevel: function(level) {
                                       }
                                   });
        var ioStub = sandbox.stub({
                                      read_all_input: function(options) {
                                      },
                                      read_template: function(options) {
                                      },
                                      write_output: function(options) {
                                      }
                                  });
        injector.mock("log/log", logStub);
        injector.mock("log/logNode", logStub);
        injector.mock("io/io", ioStub);
        injector.mock("io/ioNode", ioStub);
        injector.store(["global", "log/log", "log/logNode"]);
    });

    teardown("teardown", function() {
        injector.remove();
        sandbox.restore();
    });

    [
        { pattern: "[A-Z][A-Z0-9]*", valid: true },
        { pattern: "ab|c", valid: true },
        { pattern: "[0-9]+", valid: true },
        { pattern: "[A-Z", valid: false },
        { pattern: "*", valid: false },
        { pattern: "\\*", valid: true },
        { pattern: "[", valid: false },
        { pattern: "\\[", valid: true },
        { pattern: "]", valid: false },
        { pattern: "\\]", valid: true },
        { pattern: "(", valid: false },
        { pattern: "\\(", valid: true },
        { pattern: ")", valid: false },
        { pattern: "\\)", valid: true },
        { pattern: "|", valid: false },
        { pattern: "\\|", valid: true },
        { pattern: "?", valid: false },
        { pattern: "\\?", valid: true },
        // Backslash at end of pattern translates as literal backslash;
        // a little messy, but probably not worth changing
        { pattern: "\\", valid: true },
        { pattern: "\\\\", valid: true },
        { pattern: ".", valid: true },
        { pattern: "\\.", valid: true },
        { pattern: "\\220", valid: true }
    ].forEach(function(item) {
        test("Regex '" + item.pattern + "' " + (item.valid ? "does not log" : "logs") + " an error",
             injector.run(["mocks", "regex"],
                          function(mocks, regex) {
                              var log = mocks.store["log/logNode"];
                              log.error.resetHistory();
                              regex(item.pattern, 0, false);
                              if (item.valid) {
                                  assert.notCalled(log.error);
                              } else {
                                  assert.called(log.error);
                              }
                          }));
    });

});