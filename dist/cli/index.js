#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var di_container_1 = __importDefault(require("./di.container"));
function executeCommand(cliCommandName, cliArgs) {
    return __awaiter(this, void 0, void 0, function () {
        var diContainer, command, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    diContainer = (0, di_container_1.default)(__assign(__assign({}, cliArgs), { cliCommandName: cliCommandName }));
                    command = diContainer.resolve(cliCommandName);
                    return [4, command()];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    e_1 = _a.sent();
                    console.error("ERROR: ".concat(e_1));
                    process.exit(1);
                    return [3, 3];
                case 3: return [2];
            }
        });
    });
}
yargs_1.default
    .command('init', 'Initialize a Immunx Agent project', function (yargs) {
    yargs.option('typescript', {
        description: 'Initialize as Typescript project',
    }).option('python', {
        description: 'Initialize as Python project'
    });
}, function (cliArgs) { return executeCommand("init", cliArgs); })
    .command('info', 'Inspect state of the Immunx Bot', function (yargs) {
    yargs.option('agentId', {
        description: 'Bot id to retrieve information for. Default value is this agent',
        type: 'string'
    });
}, function (cliArgs) { return executeCommand("info", cliArgs); })
    .command('run', 'Run the Immunx Agent with latest blockchain data', function (yargs) {
    yargs.option('tx', {
        description: 'Run with the specified transaction hash',
        type: 'string'
    }).option('block', {
        description: 'Run with the specified block hash/number',
        type: 'string'
    }).option('alert', {
        description: 'Run with the specified alert hash',
        type: 'string'
    }).option('sequence', {
        description: 'Run with the specified sequence of transaction hash, block number or alert hash',
        type: 'string'
    }).option('range', {
        description: 'Run with the specified block range (e.g. 15..20)',
        type: 'string'
    }).option('file', {
        description: 'Run with the specified json file',
        type: 'string'
    }).option('prod', {
        description: 'Run a server listening for events from a Immunx Scanner'
    }).option('config', {
        description: 'Specify a config file (default: immunx.config.json)',
        type: 'string',
    }).option('nocache', {
        description: 'Disables writing to the cache (but reads are still enabled)',
        type: 'string'
    });
}, function (cliArgs) { return executeCommand("run", cliArgs); })
    .command('publish', 'Publish the Immunx Agent to the network', function (yargs) {
    yargs.option('config', {
        description: 'Specify a config file (default: immunx.config.json)',
        type: 'string',
    });
}, function (cliArgs) { return executeCommand("publish", cliArgs); })
    .command('push', 'Push the Immunx Agent image to the repository', function (yargs) {
    yargs.option('config', {
        description: 'Specify a config file (default: immunx.config.json)',
        type: 'string',
    });
}, function (cliArgs) { return executeCommand("push", cliArgs); })
    .command('disable', 'Disables the Immunx Agent', function (yargs) { }, function (cliArgs) { return executeCommand("disable", cliArgs); })
    .command('enable', 'Enables the Immunx Agent', function (yargs) { }, function (cliArgs) { return executeCommand("enable", cliArgs); })
    .command('keyfile', 'Prints out keyfile information', function (yargs) { }, function (cliArgs) { return executeCommand("keyfile", cliArgs); })
    .command('logs', 'Retrieve logs on Immunx Agent', function (yargs) {
    yargs
        .option('after', {
        description: 'An ISO timestamp representing the oldest time to include in logs',
        type: 'string'
    }).option('before', {
        description: 'An ISO timestamp representing the latest time to include in logs',
        type: 'string'
    })
        .option('scannerId', {
        description: 'Only returns logs for specified scannerId',
        type: 'string'
    })
        .option('agentId', {
        description: 'Agent id to retrieve logs for. Default value is this agent',
        type: 'string'
    });
}, function (cliArgs) { return executeCommand("logs", cliArgs); })
    .strict()
    .argv;
