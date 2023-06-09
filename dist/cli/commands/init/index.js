"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var utils_1 = require("../../utils");
function provideInit(shell, prompt, filesystem, contextPath, initKeystore, initConfig, initKeyfile, args) {
    (0, utils_1.assertExists)(shell, 'shell');
    (0, utils_1.assertExists)(prompt, 'prompt');
    (0, utils_1.assertExists)(filesystem, 'filesystem');
    (0, utils_1.assertIsNonEmptyString)(contextPath, 'contextPath');
    (0, utils_1.assertExists)(initKeystore, 'initKeystore');
    (0, utils_1.assertExists)(initConfig, 'initConfig');
    (0, utils_1.assertExists)(initKeyfile, 'initKeyfile');
    (0, utils_1.assertExists)(args, 'args');
    return function init(runtimeArgs) {
        if (runtimeArgs === void 0) { runtimeArgs = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var createContextPathResult, files, proceed, isTypescript, isPython, starterProjectPath, copyProjectResult, copyJsTsPyResult, renameGitignoreResult, rmResult, npmInstallResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = __assign(__assign({}, args), runtimeArgs);
                        if (!filesystem.existsSync(contextPath)) {
                            createContextPathResult = shell.mkdir(contextPath);
                            (0, utils_1.assertShellResult)(createContextPathResult, "error creating project folder ".concat(contextPath));
                        }
                        shell.cd(contextPath);
                        files = shell.ls();
                        if (!(files.length > 0)) return [3, 2];
                        return [4, prompt({
                                type: 'text',
                                name: 'proceed',
                                message: "The directory ".concat(contextPath, " is not empty and files could be overwritten. Are you sure you want to initialize? (type 'yes' to proceed)")
                            })];
                    case 1:
                        proceed = (_a.sent()).proceed;
                        if (proceed !== 'yes') {
                            console.log('aborting initialization');
                            return [2];
                        }
                        _a.label = 2;
                    case 2:
                        isTypescript = !!args.typescript;
                        isPython = !!args.python;
                        console.log("Initializing ".concat(isPython ? "Python" : isTypescript ? "Typescript" : "Javascript", " Immunx Agent..."));
                        starterProjectPath = "".concat((0, path_1.join)(__dirname, '..', '..', '..', 'starter-project'));
                        copyProjectResult = shell.cp('-r', ["".concat(starterProjectPath, "/*"), "".concat(starterProjectPath, "/.*")], '.');
                        (0, utils_1.assertShellResult)(copyProjectResult, 'error copying starter-project folder');
                        copyJsTsPyResult = shell.cp('-r', isPython ? './py/*' : isTypescript ? './ts/*' : './js/*', '.');
                        (0, utils_1.assertShellResult)(copyJsTsPyResult, "error unpacking ".concat(isPython ? 'py' : isTypescript ? 'ts' : 'js', " folder"));
                        renameGitignoreResult = shell.mv('_gitignore', '.gitignore');
                        (0, utils_1.assertShellResult)(renameGitignoreResult, 'error renaming gitignore file');
                        rmResult = shell.rm('-rf', 'js', 'ts', 'py', '.npmignore');
                        (0, utils_1.assertShellResult)(rmResult, 'error cleaning up files');
                        return [4, initKeystore()];
                    case 3:
                        _a.sent();
                        return [4, initConfig()];
                    case 4:
                        _a.sent();
                        return [4, initKeyfile()];
                    case 5:
                        _a.sent();
                        console.log('Running npm install...');
                        npmInstallResult = shell.exec("npm install");
                        (0, utils_1.assertShellResult)(npmInstallResult, "error installing npm dependencies");
                        console.log("You agree that your use is subject to the terms and conditions found at\u00A0https://immunx.numencyber.com/legal");
                        return [2];
                }
            });
        });
    };
}
exports.default = provideInit;
