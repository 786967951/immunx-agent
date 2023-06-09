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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideGetPythonAgentHandlers = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importStar(require("path"));
var os_1 = __importDefault(require("os"));
var python_shell_1 = require("python-shell");
var n_readlines_1 = __importDefault(require("n-readlines"));
var sdk_1 = require("../../sdk");
var _1 = require(".");
var INITIALIZE_MARKER = "!*initialize*!";
var FINDING_MARKER = "!*immunx_finding*!:";
var INITIALIZE_METHOD_NAME = "initialize";
var HANDLE_TRANSACTION_METHOD_NAME = 'handle_transaction';
var HANDLE_BLOCK_METHOD_NAME = 'handle_block';
var HANDLE_ALERT_METHOD_NAME = 'handle_alert';
function provideGetPythonAgentHandlers(contextPath) {
    (0, _1.assertIsNonEmptyString)(contextPath, 'contextPath');
    return function getPythonAgentHandlers(pythonAgentPath) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, hasInitializeHandler, hasBlockHandler, hasTransactionHandler, hasAlertHandler, pythonHandler;
            return __generator(this, function (_b) {
                _a = hasHandlers(pythonAgentPath), hasInitializeHandler = _a.hasInitializeHandler, hasBlockHandler = _a.hasBlockHandler, hasTransactionHandler = _a.hasTransactionHandler, hasAlertHandler = _a.hasAlertHandler;
                if (!hasBlockHandler && !hasTransactionHandler && !hasAlertHandler)
                    throw new Error("no handlers found in ".concat(pythonAgentPath));
                pythonHandler = getPythonHandler(pythonAgentPath, contextPath);
                return [2, {
                        initialize: hasInitializeHandler ? pythonHandler : undefined,
                        handleBlock: hasBlockHandler ? pythonHandler : undefined,
                        handleTransaction: hasTransactionHandler ? pythonHandler : undefined,
                        handleAlert: hasAlertHandler ? pythonHandler : undefined
                    }];
            });
        });
    };
}
exports.provideGetPythonAgentHandlers = provideGetPythonAgentHandlers;
function hasHandlers(agentPath) {
    var lineReader = new n_readlines_1.default(agentPath);
    var hasTransactionHandler = false;
    var hasBlockHandler = false;
    var hasInitializeHandler = false;
    var hasAlertHandler = false;
    var line;
    while (line = lineReader.next()) {
        line = line.toString('ascii');
        if (line.startsWith("def ".concat(HANDLE_TRANSACTION_METHOD_NAME))) {
            hasTransactionHandler = true;
        }
        else if (line.startsWith("def ".concat(HANDLE_BLOCK_METHOD_NAME))) {
            hasBlockHandler = true;
        }
        else if (line.startsWith("def ".concat(INITIALIZE_METHOD_NAME))) {
            hasInitializeHandler = true;
        }
        else if (line.startsWith("def ".concat(HANDLE_ALERT_METHOD_NAME))) {
            hasAlertHandler = true;
        }
    }
    return { hasTransactionHandler: hasTransactionHandler, hasBlockHandler: hasBlockHandler, hasInitializeHandler: hasInitializeHandler, hasAlertHandler: hasAlertHandler };
}
function getPythonHandler(agentPath, contextPath) {
    var agentModule = agentPath.replace("".concat(contextPath).concat(path_1.default.sep), '').replace('.py', '').replace(path_1.default.sep, '.');
    var pythonWrapperScript = "\nimport sys\nsys.path.append('".concat(contextPath, "')\nimport json\nfrom immunx_agent import BlockEvent, TransactionEvent, AlertEvent\nimport ").concat(agentModule, "\n\nwhile True:\n  try:\n    msgJson = json.loads(input())\n    msgType = msgJson['msgType']\n    if msgType == '").concat(INITIALIZE_METHOD_NAME, "':\n      initializeResponse = ").concat(agentModule, ".").concat(INITIALIZE_METHOD_NAME, "()\n      print(f'").concat(INITIALIZE_MARKER, "{json.dumps(initializeResponse) if initializeResponse is not None else \"\"}')\n    elif msgType == '").concat(HANDLE_TRANSACTION_METHOD_NAME, "':\n      hash = msgJson['hash']\n      event = TransactionEvent(msgJson)\n      findings = ").concat(agentModule, ".").concat(HANDLE_TRANSACTION_METHOD_NAME, "(event)\n      print(f'").concat(FINDING_MARKER, "{hash}:{json.dumps(findings, default=lambda f: f.toJson())}')\n    elif msgType == '").concat(HANDLE_BLOCK_METHOD_NAME, "':\n      hash = msgJson['hash']\n      event = BlockEvent(msgJson)\n      findings = ").concat(agentModule, ".").concat(HANDLE_BLOCK_METHOD_NAME, "(event)\n      print(f'").concat(FINDING_MARKER, "{hash}:{json.dumps(findings, default=lambda f: f.toJson())}')\n    elif msgType == '").concat(HANDLE_ALERT_METHOD_NAME, "':\n      hash = msgJson['hash']\n      event = AlertEvent(msgJson)\n      findings = ").concat(agentModule, ".").concat(HANDLE_ALERT_METHOD_NAME, "(event)\n      print(f'").concat(FINDING_MARKER, "{hash}:{json.dumps(findings, default=lambda f: f.toJson())}')\n  except Exception as e:\n    print(e, file=sys.stderr)\n");
    var randomInt = Math.floor(Math.random() * Date.now());
    var pythonWrapperPath = (0, path_1.join)(os_1.default.tmpdir(), "immunx_agent_".concat(randomInt, ".py"));
    fs_1.default.writeFileSync(pythonWrapperPath, pythonWrapperScript);
    python_shell_1.PythonShell.checkSyntaxFile(pythonWrapperPath);
    var promiseCallbackMap = {};
    var pythonWrapper = new python_shell_1.PythonShell(pythonWrapperPath, { args: process.argv })
        .on("message", function (message) {
        if (message.startsWith(INITIALIZE_MARKER)) {
            var initializeResponseStartIndex = INITIALIZE_MARKER.length;
            var initializeResponseJson = message.substr(initializeResponseStartIndex);
            var initializeResponse = undefined;
            if (initializeResponseJson.length) {
                initializeResponse = JSON.parse(initializeResponseJson);
            }
            var resolve_1 = promiseCallbackMap['init'].resolve;
            resolve_1(initializeResponse);
            delete promiseCallbackMap['init'];
            return;
        }
        else if (!message.startsWith(FINDING_MARKER)) {
            console.log(message);
            return;
        }
        var hashStartIndex = FINDING_MARKER.length;
        var hashEndIndex = message.indexOf(':', hashStartIndex);
        var hash = message.substr(hashStartIndex, hashEndIndex - hashStartIndex);
        var findingsJson = JSON.parse(message.substr(hashEndIndex + 1));
        var findings = findingsJson.map(function (findingJson) { return sdk_1.Finding.fromObject(JSON.parse(findingJson)); });
        var resolve = promiseCallbackMap[hash].resolve;
        resolve(findings);
        delete promiseCallbackMap[hash];
    })
        .on("stderr", function (err) {
        console.log(err);
        var hash = Object.keys(promiseCallbackMap)[0];
        if (hash && promiseCallbackMap[hash]) {
            var reject = promiseCallbackMap[hash].reject;
            reject(new Error("python: ".concat(err)));
        }
    });
    return function handler(event) {
        return new Promise(function (resolve, reject) {
            var msgType, hash;
            if (!event) {
                msgType = INITIALIZE_METHOD_NAME;
                hash = 'init';
            }
            else if (event instanceof sdk_1.BlockEvent) {
                msgType = HANDLE_BLOCK_METHOD_NAME;
                hash = event.blockHash;
            }
            else if (event instanceof sdk_1.AlertEvent) {
                msgType = HANDLE_ALERT_METHOD_NAME;
                hash = event.alertHash;
            }
            else {
                msgType = HANDLE_TRANSACTION_METHOD_NAME;
                hash = event.hash;
            }
            promiseCallbackMap[hash] = { resolve: resolve, reject: reject };
            pythonWrapper.send(JSON.stringify(__assign({ msgType: msgType, hash: hash }, event)));
        });
    };
}
