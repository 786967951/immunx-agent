"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var _1 = require(".");
function provideGetKeyfile(listKeyfiles, filesystem, immunxKeystore, keyfileName) {
    (0, _1.assertExists)(listKeyfiles, 'listKeyfiles');
    (0, _1.assertExists)(filesystem, 'filesystem');
    (0, _1.assertIsNonEmptyString)(immunxKeystore, 'immunxKeystore');
    return function getKeyfile() {
        if (!filesystem.existsSync(immunxKeystore)) {
            throw new Error("keystore folder ".concat(immunxKeystore, " not found"));
        }
        var keyfiles = listKeyfiles();
        if (!keyfileName) {
            keyfileName = keyfiles[0];
        }
        else {
            var keyfileAddress_1 = keyfileName.substr(keyfileName.lastIndexOf('--') + 2);
            keyfileName = keyfiles.find(function (keyfile) { return keyfile.endsWith(keyfileAddress_1); });
        }
        var keyfilePath = path_1.default.join(immunxKeystore, keyfileName);
        if (!filesystem.existsSync(keyfilePath)) {
            throw new Error("keyfile not found at ".concat(keyfilePath));
        }
        return {
            path: keyfilePath,
            name: keyfileName
        };
    };
}
exports.default = provideGetKeyfile;
