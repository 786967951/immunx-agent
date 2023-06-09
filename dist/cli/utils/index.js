"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockChainNetworkConfig = exports.createAlertEvent = exports.createTransactionEvent = exports.createBlockEvent = exports.isZeroAddress = exports.formatAddress = exports.keccak256 = exports.isValidTimeRange = exports.assertIsValidChainSettings = exports.assertFindings = exports.assertShellResult = exports.assertIsISOString = exports.assertIsNonEmptyString = exports.assertExists = exports.getJsonFile = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var lodash_1 = __importDefault(require("lodash"));
var jsonc_1 = require("jsonc");
var sha3_1 = require("sha3");
var address_1 = require("@ethersproject/address");
var sdk_1 = require("../../sdk");
var getJsonFile = function (filePath) {
    if (filePath.startsWith(".".concat(path_1.default.sep))) {
        filePath = filePath.replace(".".concat(path_1.default.sep), "".concat(process.cwd()).concat(path_1.default.sep));
    }
    var data = fs_1.default.readFileSync(filePath, 'utf8');
    return jsonc_1.jsonc.parse(data);
};
exports.getJsonFile = getJsonFile;
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
var assertIsISOString = function (str, fieldName) {
    var fieldNameText = fieldName ? "Field name ".concat(fieldName) : "";
    if (isNaN(Date.parse(str))) {
        throw new Error("".concat(fieldNameText, " has invalid value. ").concat(str, " is not a valid ISO timestamp. The ISO format is: YYYY-MM-DDTHH:mmZ"));
    }
};
exports.assertIsISOString = assertIsISOString;
var assertShellResult = function (result, errMsg) {
    if (result.code !== 0) {
        throw new Error("".concat(errMsg, ": ").concat(result.stderr));
    }
};
exports.assertShellResult = assertShellResult;
var assertFindings = function (findings) {
    var byteLength = Buffer.byteLength(JSON.stringify(findings));
    var kilobyte = 1024;
    if (byteLength > kilobyte * 50)
        throw Error("Cannot return more than 50kB of findings per request (received ".concat(byteLength, " bytes)"));
    if (findings.length > 50)
        throw Error("Cannot return more than 50 findings per request (received ".concat(findings.length, ")"));
};
exports.assertFindings = assertFindings;
var assertIsValidChainSettings = function (chainSettings) {
    if (!chainSettings) {
        return;
    }
    for (var key in chainSettings) {
        if (key == "default") {
            continue;
        }
        if (isNaN(parseInt(key))) {
            throw new Error("keys in chainSettings must be numerical string or default");
        }
    }
};
exports.assertIsValidChainSettings = assertIsValidChainSettings;
var isValidTimeRange = function (earliestTimestamp, latestTimestamp) {
    return earliestTimestamp < latestTimestamp;
};
exports.isValidTimeRange = isValidTimeRange;
var keccak256 = function (str) {
    var hash = new sha3_1.Keccak(256);
    hash.update(str);
    return "0x".concat(hash.digest('hex'));
};
exports.keccak256 = keccak256;
var formatAddress = function (address) {
    return lodash_1.default.isString(address) ? address.toLowerCase() : address;
};
exports.formatAddress = formatAddress;
var isZeroAddress = function (address) {
    return "0x0000000000000000000000000000000000000000" === address;
};
exports.isZeroAddress = isZeroAddress;
var createBlockEvent = function (block, networkId) {
    var blok = {
        difficulty: block.difficulty,
        extraData: block.extraData,
        gasLimit: block.gasLimit,
        gasUsed: block.gasUsed,
        hash: block.hash,
        logsBloom: block.logsBloom,
        miner: (0, exports.formatAddress)(block.miner),
        mixHash: block.mixHash,
        nonce: block.nonce,
        number: parseInt(block.number),
        parentHash: block.parentHash,
        receiptsRoot: block.receiptsRoot,
        sha3Uncles: block.sha3Uncles,
        size: block.size,
        stateRoot: block.stateRoot,
        timestamp: parseInt(block.timestamp),
        totalDifficulty: block.totalDifficulty,
        transactions: block.transactions.map(function (tx) { return tx.hash; }),
        transactionsRoot: block.transactionsRoot,
        uncles: block.uncles
    };
    return new sdk_1.BlockEvent(sdk_1.EventType.BLOCK, networkId, blok);
};
exports.createBlockEvent = createBlockEvent;
var createTransactionEvent = function (transaction, block, networkId, traces, logs) {
    var _a;
    if (traces === void 0) { traces = []; }
    if (logs === void 0) { logs = []; }
    var tx = {
        hash: transaction.hash,
        from: (0, exports.formatAddress)(transaction.from),
        to: transaction.to ? (0, exports.formatAddress)(transaction.to) : null,
        nonce: parseInt(transaction.nonce),
        gas: transaction.gas,
        gasPrice: transaction.gasPrice,
        value: transaction.value,
        data: transaction.input,
        r: transaction.r,
        s: transaction.s,
        v: transaction.v,
    };
    var addresses = (_a = {},
        _a[tx.from] = true,
        _a);
    if (tx.to) {
        addresses[tx.to] = true;
    }
    var blok = {
        hash: block.hash,
        number: parseInt(block.number),
        timestamp: parseInt(block.timestamp)
    };
    var trcs = [];
    traces.forEach(function (trace) {
        var _a, _b, _c, _d;
        addresses[(0, exports.formatAddress)(trace.action.address)] = true;
        addresses[(0, exports.formatAddress)(trace.action.refundAddress)] = true;
        addresses[(0, exports.formatAddress)(trace.action.to)] = true;
        addresses[(0, exports.formatAddress)(trace.action.from)] = true;
        trcs.push({
            action: {
                callType: trace.action.callType,
                to: (0, exports.formatAddress)(trace.action.to),
                input: trace.action.input,
                from: (0, exports.formatAddress)(trace.action.from),
                value: trace.action.value,
                init: trace.action.init,
                address: (0, exports.formatAddress)(trace.action.address),
                balance: trace.action.balance,
                refundAddress: (0, exports.formatAddress)(trace.action.refundAddress),
            },
            blockHash: trace.blockHash,
            blockNumber: trace.blockNumber,
            result: {
                gasUsed: (_a = trace.result) === null || _a === void 0 ? void 0 : _a.gasUsed,
                address: (_b = trace.result) === null || _b === void 0 ? void 0 : _b.address,
                code: (_c = trace.result) === null || _c === void 0 ? void 0 : _c.code,
                output: (_d = trace.result) === null || _d === void 0 ? void 0 : _d.output
            },
            subtraces: trace.subtraces,
            traceAddress: trace.traceAddress,
            transactionHash: trace.transactionHash,
            transactionPosition: trace.transactionPosition,
            type: trace.type,
            error: trace.error,
        });
    });
    var lgs = logs.map(function (log) { return ({
        address: (0, exports.formatAddress)(log.address),
        topics: log.topics,
        data: log.data,
        logIndex: parseInt(log.logIndex),
        blockNumber: parseInt(log.blockNumber),
        blockHash: log.blockHash,
        transactionIndex: parseInt(log.transactionIndex),
        transactionHash: log.transactionHash,
        removed: log.removed,
    }); });
    lgs.forEach(function (log) { return addresses[log.address] = true; });
    var contractAddress = null;
    if ((0, exports.isZeroAddress)(transaction.to)) {
        contractAddress = (0, exports.formatAddress)((0, address_1.getContractAddress)({ from: transaction.from, nonce: transaction.nonce }));
    }
    return new sdk_1.TransactionEvent(sdk_1.EventType.BLOCK, networkId, tx, trcs, addresses, blok, lgs, contractAddress);
};
exports.createTransactionEvent = createTransactionEvent;
var createAlertEvent = function (alert) {
    return new sdk_1.AlertEvent(alert);
};
exports.createAlertEvent = createAlertEvent;
var DEFAULTS_BLOCK_TIME_IN_SECONDS = 15;
var getBlockChainNetworkConfig = function (chainId) {
    switch (chainId) {
        case (1): {
            return SUPPORTED_NETWORKS['ethereum'];
        }
        case (137): {
            return SUPPORTED_NETWORKS['polygon'];
        }
        case (56): {
            return SUPPORTED_NETWORKS['binance_smart_chain'];
        }
        case (43114): {
            return SUPPORTED_NETWORKS['avalanche'];
        }
        case (42161): {
            return SUPPORTED_NETWORKS['arbitrum'];
        }
        case (10): {
            return SUPPORTED_NETWORKS['optimism'];
        }
        case (250): {
            return SUPPORTED_NETWORKS['fantom'];
        }
        default:
            return {
                chainId: chainId,
                blockTimeInSeconds: DEFAULTS_BLOCK_TIME_IN_SECONDS
            };
    }
};
exports.getBlockChainNetworkConfig = getBlockChainNetworkConfig;
var SUPPORTED_NETWORKS = {
    "ethereum": {
        chainId: 1,
        blockTimeInSeconds: DEFAULTS_BLOCK_TIME_IN_SECONDS
    },
    "polygon": {
        chainId: 137,
        blockTimeInSeconds: 3
    },
    "binance_smart_chain": {
        chainId: 56,
        blockTimeInSeconds: 5
    },
    "avalanche": {
        chainId: 43114,
        blockTimeInSeconds: 3
    },
    "arbitrum": {
        chainId: 42161,
        blockTimeInSeconds: DEFAULTS_BLOCK_TIME_IN_SECONDS
    },
    "optimism": {
        chainId: 10,
        blockTimeInSeconds: DEFAULTS_BLOCK_TIME_IN_SECONDS
    },
    "fantom": {
        chainId: 250,
        blockTimeInSeconds: 5
    }
};
