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
var _a = require("../../../../sdk"), BlockEvent = _a.BlockEvent, TransactionEvent = _a.TransactionEvent, isPrivateFindings = _a.isPrivateFindings, AlertEvent = _a.AlertEvent, Alert = _a.Alert;
var _b = require("../../../utils"), assertExists = _b.assertExists, formatAddress = _b.formatAddress, assertFindings = _b.assertFindings;
module.exports = (function () {
    function AgentController(getAgentHandlers) {
        assertExists(getAgentHandlers, "getAgentHandlers");
        this.getAgentHandlers = getAgentHandlers;
        this.initializeAgentHandlers();
        this.isInitialized = false;
        this.initializeResponse = {};
    }
    AgentController.prototype.Initialize = function (call, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var status, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        status = "SUCCESS";
                        if (!(this.initialize && !this.isInitialized)) return [3, 4];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4, this.initialize()];
                    case 2:
                        _a.initializeResponse = _b.sent();
                        this.isInitialized = true;
                        return [3, 4];
                    case 3:
                        e_1 = _b.sent();
                        console.log("".concat(new Date().toISOString(), "    initialize"));
                        console.log(e_1);
                        status = "ERROR";
                        return [3, 4];
                    case 4:
                        callback(null, {
                            status: status,
                            alertConfig: this.initializeResponse
                                ? this.initializeResponse.alertConfig
                                : undefined,
                        });
                        return [2];
                }
            });
        });
    };
    AgentController.prototype.EvaluateBlock = function (call, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var findings, status, blockEvent, returnedFindings, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findings = [];
                        status = "SUCCESS";
                        if (!this.handleBlock) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        blockEvent = this.createBlockEventFromGrpcRequest(call.request);
                        return [4, this.handleBlock(blockEvent)];
                    case 2:
                        returnedFindings = _a.sent();
                        assertFindings(returnedFindings);
                        findings.push.apply(findings, returnedFindings);
                        return [3, 4];
                    case 3:
                        e_2 = _a.sent();
                        console.log("".concat(new Date().toISOString(), "    evaluateBlock ").concat(call.request.event.blockHash));
                        console.log(e_2);
                        status = "ERROR";
                        return [3, 4];
                    case 4:
                        callback(null, {
                            status: status,
                            findings: findings,
                            metadata: {
                                timestamp: new Date().toISOString(),
                            },
                            private: isPrivateFindings(),
                        });
                        return [2];
                }
            });
        });
    };
    AgentController.prototype.EvaluateTx = function (call, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var findings, status, txEvent, returnedFindings, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findings = [];
                        status = "SUCCESS";
                        if (!this.handleTransaction) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        txEvent = this.createTransactionEventFromGrpcRequest(call.request);
                        return [4, this.handleTransaction(txEvent)];
                    case 2:
                        returnedFindings = _a.sent();
                        assertFindings(returnedFindings);
                        findings.push.apply(findings, returnedFindings);
                        return [3, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.log("".concat(new Date().toISOString(), "    evaluateTx ").concat(call.request.event.transaction.hash));
                        console.log(e_3);
                        status = "ERROR";
                        return [3, 4];
                    case 4:
                        callback(null, {
                            status: status,
                            findings: findings,
                            metadata: {
                                timestamp: new Date().toISOString(),
                            },
                            private: isPrivateFindings(),
                        });
                        return [2];
                }
            });
        });
    };
    AgentController.prototype.EvaluateAlert = function (call, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var findings, status, alertEvent, returnedFindings, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        findings = [];
                        status = "SUCCESS";
                        if (!this.handleAlert) return [3, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        alertEvent = this.createAlertEventFromGrpcRequest(call.request);
                        return [4, this.handleAlert(alertEvent)];
                    case 2:
                        returnedFindings = _a.sent();
                        assertFindings(returnedFindings);
                        findings.push.apply(findings, returnedFindings);
                        return [3, 4];
                    case 3:
                        e_4 = _a.sent();
                        console.log("".concat(new Date().toISOString(), "    evaluateAlert ").concat(call.request.hash));
                        console.log(e_4);
                        status = "ERROR";
                        return [3, 4];
                    case 4:
                        callback(null, {
                            status: status,
                            findings: findings,
                            metadata: {
                                timestamp: new Date().toISOString(),
                            },
                            private: isPrivateFindings(),
                        });
                        return [2];
                }
            });
        });
    };
    AgentController.prototype.initializeAgentHandlers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var agentHandlers, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.getAgentHandlers({
                                shouldRunInitialize: false,
                            })];
                    case 1:
                        agentHandlers = _a.sent();
                        this.initialize = agentHandlers.initialize;
                        this.handleBlock = agentHandlers.handleBlock;
                        this.handleTransaction = agentHandlers.handleTransaction;
                        this.handleAlert = agentHandlers.handleAlert;
                        return [3, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    AgentController.prototype.createBlockEventFromGrpcRequest = function (request) {
        var _a = request.event, type = _a.type, network = _a.network, block = _a.block;
        var blok = {
            difficulty: block.difficulty,
            extraData: block.extraData,
            gasLimit: block.gasLimit,
            gasUsed: block.gasUsed,
            hash: block.hash,
            logsBloom: block.logsBloom,
            miner: formatAddress(block.miner),
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
            transactions: block.transactions,
            transactionsRoot: block.transactionsRoot,
            uncles: block.uncles,
        };
        return new BlockEvent(type, parseInt(network.chainId), blok);
    };
    AgentController.prototype.createAlertEventFromGrpcRequest = function (request) {
        var alert = request.event.alert;
        return new AlertEvent(Alert.fromObject(alert));
    };
    AgentController.prototype.createTransactionEventFromGrpcRequest = function (request) {
        var _a = request.event, type = _a.type, network = _a.network, tx = _a.transaction, lgs = _a.logs, trcs = _a.traces, addresses = _a.addresses, block = _a.block, contractAddress = _a.contractAddress;
        var transaction = {
            hash: tx.hash,
            from: formatAddress(tx.from),
            to: tx.to ? formatAddress(tx.to) : null,
            nonce: parseInt(tx.nonce),
            gas: tx.gas,
            gasPrice: tx.gasPrice,
            value: tx.value,
            data: tx.input,
            r: tx.r,
            s: tx.s,
            v: tx.v,
        };
        var logs = lgs.map(function (log) { return ({
            address: formatAddress(log.address),
            topics: log.topics,
            data: log.data,
            logIndex: parseInt(log.logIndex),
            blockNumber: parseInt(log.blockNumber),
            blockHash: log.blockHash,
            transactionIndex: parseInt(log.transactionIndex),
            transactionHash: log.transactionHash,
            removed: log.removed,
        }); });
        var traces = !trcs
            ? []
            : trcs.map(function (trace) {
                var _a, _b, _c, _d;
                return ({
                    action: {
                        callType: trace.action.callType,
                        to: formatAddress(trace.action.to),
                        input: trace.action.input,
                        from: formatAddress(trace.action.from),
                        value: trace.action.value,
                        init: trace.action.init,
                        address: formatAddress(trace.action.address),
                        balance: trace.action.balance,
                        refundAddress: formatAddress(trace.action.refundAddress),
                    },
                    blockHash: trace.blockHash,
                    blockNumber: trace.blockNumber,
                    result: {
                        gasUsed: (_a = trace.result) === null || _a === void 0 ? void 0 : _a.gasUsed,
                        address: (_b = trace.result) === null || _b === void 0 ? void 0 : _b.address,
                        code: (_c = trace.result) === null || _c === void 0 ? void 0 : _c.code,
                        output: (_d = trace.result) === null || _d === void 0 ? void 0 : _d.output,
                    },
                    subtraces: trace.subtraces,
                    traceAddress: trace.traceAddress,
                    transactionHash: trace.transactionHash,
                    transactionPosition: trace.transactionPosition,
                    type: trace.type,
                    error: trace.error,
                });
            });
        var blok = {
            hash: block.blockHash,
            number: parseInt(block.blockNumber),
            timestamp: parseInt(block.blockTimestamp),
        };
        return new TransactionEvent(type, parseInt(network.chainId), transaction, traces, addresses, blok, logs, formatAddress(contractAddress));
    };
    return AgentController;
}());
