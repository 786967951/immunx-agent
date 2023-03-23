"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
function provideListKeyfiles(shell, immunxKeystore, configFilename) {
    (0, _1.assertExists)(shell, 'shell');
    (0, _1.assertIsNonEmptyString)(immunxKeystore, 'immunxKeystore');
    (0, _1.assertIsNonEmptyString)(configFilename, 'configFilename');
    return function listKeyfiles() {
        return shell.ls(immunxKeystore).filter(function (filename) { return filename.startsWith("UTC") && filename !== configFilename; });
    };
}
exports.default = provideListKeyfiles;
