"use strict";
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
exports.getAlerts = exports.isPrivateFindings = exports.setPrivateFindings = exports.keccak256 = exports.assertIsFromEnum = exports.assertIsNonEmptyString = exports.assertExists = exports.createAlertEvent = exports.createBlockEvent = exports.createTransactionEvent = exports.getTransactionReceipt = exports.getJsonRpcUrl = exports.getEthersBatchProvider = exports.getEthersProvider = void 0;
var os_1 = __importDefault(require("os"));
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var jsonc_1 = require("jsonc");
var lodash_1 = __importDefault(require("lodash"));
var sha3_1 = require("sha3");
var _1 = require(".");
var _2 = require(".");
var immunx_1 = require("./graphql/immunx");
var axios_1 = __importDefault(require("axios"));
var getEthersProvider = function () {
    return new _2.ethers.providers.JsonRpcProvider((0, exports.getJsonRpcUrl)());
};
exports.getEthersProvider = getEthersProvider;
var getEthersBatchProvider = function () {
    return new _2.ethers.providers.JsonRpcBatchProvider((0, exports.getJsonRpcUrl)());
};
exports.getEthersBatchProvider = getEthersBatchProvider;
var getImmunxConfig = function () {
    var config = {};
    var globalConfigPath = (0, path_1.join)(os_1.default.homedir(), '.immunx', 'immunx.config.json');
    if (fs_1.default.existsSync(globalConfigPath)) {
        config = Object.assign(config, jsonc_1.jsonc.parse(fs_1.default.readFileSync(globalConfigPath, 'utf8')));
    }
    var configFlagIndex = process.argv.indexOf('--config');
    var configFile = configFlagIndex == -1 ? undefined : process.argv[configFlagIndex + 1];
    var localConfigPath = (0, path_1.join)(process.cwd(), configFile || 'immunx.config.json');
    if (fs_1.default.existsSync(localConfigPath)) {
        config = Object.assign(config, jsonc_1.jsonc.parse(fs_1.default.readFileSync(localConfigPath, 'utf8')));
    }
    return config;
};
var getJsonRpcUrl = function () {
    if (process.env.JSON_RPC_HOST) {
        return "http://".concat(process.env.JSON_RPC_HOST).concat(process.env.JSON_RPC_PORT ? ":".concat(process.env.JSON_RPC_PORT) : '');
    }
    var jsonRpcUrl = getImmunxConfig().jsonRpcUrl;
    if (!jsonRpcUrl)
        return "https://cloudflare-eth.com/";
    if (!jsonRpcUrl.startsWith("http"))
        throw new Error('jsonRpcUrl must begin with http(s)');
    return jsonRpcUrl;
};
exports.getJsonRpcUrl = getJsonRpcUrl;
var getTransactionReceipt = function (txHash) { return __awaiter(void 0, void 0, void 0, function () {
    var ethersProvider, jsonReceipt, receipt;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ethersProvider = (0, exports.getEthersProvider)();
                return [4, ethersProvider.send('eth_getTransactionReceipt', [txHash])];
            case 1:
                jsonReceipt = _b.sent();
                receipt = {
                    blockNumber: parseInt(jsonReceipt.blockNumber),
                    blockHash: jsonReceipt.blockHash,
                    transactionIndex: parseInt(jsonReceipt.transactionIndex),
                    transactionHash: jsonReceipt.transactionHash,
                    status: jsonReceipt.status === "0x1",
                    logsBloom: jsonReceipt.logsBloom,
                    contractAddress: jsonReceipt.contractAddress ? jsonReceipt.contractAddress.toLowerCase() : null,
                    gasUsed: jsonReceipt.gasUsed,
                    cumulativeGasUsed: jsonReceipt.cumulativeGasUsed,
                    logs: jsonReceipt.logs.map(function (log) { return ({
                        address: log.address.toLowerCase(),
                        topics: log.topics,
                        data: log.data,
                        logIndex: parseInt(log.logIndex),
                        blockNumber: parseInt(log.blockNumber),
                        blockHash: log.blockHash,
                        transactionIndex: parseInt(log.transactionIndex),
                        transactionHash: log.transactionHash,
                        removed: log.removed,
                    }); }),
                    root: (_a = jsonReceipt.root) !== null && _a !== void 0 ? _a : '',
                };
                return [2, receipt];
        }
    });
}); };
exports.getTransactionReceipt = getTransactionReceipt;
var createTransactionEvent = function (_a) {
    var _b = _a.type, type = _b === void 0 ? _1.EventType.BLOCK : _b, _c = _a.network, network = _c === void 0 ? _1.Network.MAINNET : _c, transaction = _a.transaction, _d = _a.traces, traces = _d === void 0 ? [] : _d, _e = _a.addresses, addresses = _e === void 0 ? {} : _e, block = _a.block, _f = _a.logs, logs = _f === void 0 ? [] : _f, contractAddress = _a.contractAddress;
    return new _1.TransactionEvent(type, network, transaction, traces, addresses, block, logs, contractAddress);
};
exports.createTransactionEvent = createTransactionEvent;
var createBlockEvent = function (_a) {
    var _b = _a.type, type = _b === void 0 ? _1.EventType.BLOCK : _b, _c = _a.network, network = _c === void 0 ? _1.Network.MAINNET : _c, block = _a.block;
    return new _1.BlockEvent(type, network, block);
};
exports.createBlockEvent = createBlockEvent;
var createAlertEvent = function (_a) {
    var alert = _a.alert;
    return new _1.AlertEvent(alert);
};
exports.createAlertEvent = createAlertEvent;
var assertExists = function (obj, objName) {
    if (lodash_1.default.isNil(obj))
        throw new Error("".concat(objName, " is required"));
};
exports.assertExists = assertExists;
var assertIsNonEmptyString = function (str, varName) {
    if (!lodash_1.default.isString(str) || str.length === 0) {
        throw new Error("".concat(varName, " must be non-empty string"));
    }
};
exports.assertIsNonEmptyString = assertIsNonEmptyString;
var assertIsFromEnum = function (value, Enum, varName) {
    if (!Object.values(Enum).includes(value)) {
        throw new Error("".concat(varName, " must be valid enum value"));
    }
};
exports.assertIsFromEnum = assertIsFromEnum;
var keccak256 = function (str) {
    var hash = new sha3_1.Keccak(256);
    hash.update(str);
    return "0x".concat(hash.digest('hex'));
};
exports.keccak256 = keccak256;
var IS_PRIVATE_FINDINGS = false;
var setPrivateFindings = function (isPrivate) {
    IS_PRIVATE_FINDINGS = isPrivate;
};
exports.setPrivateFindings = setPrivateFindings;
var isPrivateFindings = function () {
    return IS_PRIVATE_FINDINGS;
};
exports.isPrivateFindings = isPrivateFindings;
var getAlerts = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var response, pageInfo, alerts, _i, _a, alertData;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, axios_1.default.post(immunx_1.IMMUNX_GRAPHQL_URL, (0, immunx_1.getQueryFromAlertOptions)(query), { headers: { "content-type": "application/json" } })];
            case 1:
                response = _b.sent();
                if (response.data && response.data.errors)
                    throw Error(response.data.errors);
                pageInfo = response.data.data.alerts.pageInfo;
                alerts = [];
                for (_i = 0, _a = response.data.data.alerts.alerts; _i < _a.length; _i++) {
                    alertData = _a[_i];
                    alerts.push(_1.Alert.fromObject(alertData));
                }
                return [2, { alerts: alerts, pageInfo: pageInfo }];
        }
    });
}); };
exports.getAlerts = getAlerts;
