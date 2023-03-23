"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var _1 = require(".");
function provideGetImmunxConfig(filesystem, isProduction, configFilename, localConfigFilename, immunxKeystore, getJsonFile, contextPath) {
    (0, _1.assertExists)(filesystem, 'filesystem');
    (0, _1.assertIsNonEmptyString)(configFilename, 'configFilename');
    (0, _1.assertIsNonEmptyString)(localConfigFilename, 'localConfigFilename');
    (0, _1.assertIsNonEmptyString)(immunxKeystore, 'immunxKeystore');
    (0, _1.assertExists)(getJsonFile, 'getJsonFile');
    (0, _1.assertIsNonEmptyString)(contextPath, 'contextPath');
    return function getImmunxConfig() {
        var config = {};
        var globalConfigPath = (0, path_1.join)(immunxKeystore, configFilename);
        var globalConfigExists = filesystem.existsSync(globalConfigPath);
        var localConfigPath = (0, path_1.join)(contextPath, localConfigFilename);
        var localConfigExists = filesystem.existsSync(localConfigPath);
        var noConfigExists = !globalConfigExists && !localConfigExists;
        if (noConfigExists || isProduction)
            return config;
        if (globalConfigExists) {
            try {
                config = Object.assign(config, getJsonFile(globalConfigPath));
            }
            catch (e) {
                throw new Error("unable to parse config file ".concat(configFilename, ": ").concat(e.message));
            }
        }
        if (localConfigExists) {
            try {
                config = Object.assign(config, getJsonFile(localConfigPath));
            }
            catch (e) {
                throw new Error("unable to parse project config file ".concat(localConfigFilename, ": ").concat(e.message));
            }
        }
        return config;
    };
}
exports.default = provideGetImmunxConfig;
