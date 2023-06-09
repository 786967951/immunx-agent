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
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideRunLive = void 0;
var utils_1 = require("../../utils");
function provideRunLive(getAgentHandlers, getSubscriptionAlerts, ethersProvider, runHandlersOnBlock, runHandlersOnAlert, sleep) {
    (0, utils_1.assertExists)(getAgentHandlers, "getAgentHandlers");
    (0, utils_1.assertExists)(getSubscriptionAlerts, "getSubscriptionAlerts");
    (0, utils_1.assertExists)(ethersProvider, "ethersProvider");
    (0, utils_1.assertExists)(runHandlersOnBlock, "runHandlersOnBlock");
    (0, utils_1.assertExists)(runHandlersOnAlert, "runHandlersOnAlert");
    (0, utils_1.assertExists)(sleep, "sleep");
    return function runLive(shouldContinuePolling) {
        if (shouldContinuePolling === void 0) { shouldContinuePolling = function () { return true; }; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, handleBlock, handleTransaction, handleAlert, initializeResponse, sensorSubscriptions, network, chainId, blockTimeInSeconds, currBlockNumber, lastAlertFetchTimestamp, latestBlockNumber, queryStartTime, alerts, _i, alerts_1, alert_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, getAgentHandlers()];
                    case 1:
                        _a = _b.sent(), handleBlock = _a.handleBlock, handleTransaction = _a.handleTransaction, handleAlert = _a.handleAlert, initializeResponse = _a.initializeResponse;
                        if (!handleBlock && !handleTransaction && !handleAlert) {
                            throw new Error("no block/transaction/alert handler found");
                        }
                        sensorSubscriptions = [];
                        if (initializeResponse === null || initializeResponse === void 0 ? void 0 : initializeResponse.alertConfig) {
                            sensorSubscriptions = initializeResponse.alertConfig.subscriptions;
                        }
                        console.log("listening for blockchain data...");
                        return [4, ethersProvider.getNetwork()];
                    case 2:
                        network = _b.sent();
                        chainId = network.chainId;
                        blockTimeInSeconds = (0, utils_1.getBlockChainNetworkConfig)(chainId).blockTimeInSeconds;
                        lastAlertFetchTimestamp = undefined;
                        _b.label = 3;
                    case 3:
                        if (!shouldContinuePolling()) return [3, 15];
                        return [4, ethersProvider.getBlockNumber()];
                    case 4:
                        latestBlockNumber = _b.sent();
                        if (currBlockNumber == undefined) {
                            currBlockNumber = latestBlockNumber;
                        }
                        if (!(currBlockNumber > latestBlockNumber)) return [3, 6];
                        return [4, sleep(blockTimeInSeconds * 1000)];
                    case 5:
                        _b.sent();
                        return [3, 14];
                    case 6:
                        if (!(currBlockNumber <= latestBlockNumber)) return [3, 9];
                        if (!(handleBlock || handleTransaction)) return [3, 8];
                        return [4, runHandlersOnBlock(currBlockNumber)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        currBlockNumber++;
                        return [3, 6];
                    case 9:
                        if (!(handleAlert &&
                            (lastAlertFetchTimestamp == undefined ||
                                Date.now() - lastAlertFetchTimestamp.getTime() > 60000))) return [3, 14];
                        queryStartTime = new Date();
                        console.log("querying alerts...");
                        return [4, getSubscriptionAlerts(sensorSubscriptions, lastAlertFetchTimestamp || new Date(Date.now() - 60000))];
                    case 10:
                        alerts = _b.sent();
                        console.log("found ".concat(alerts.length, " alerts"));
                        lastAlertFetchTimestamp = queryStartTime;
                        _i = 0, alerts_1 = alerts;
                        _b.label = 11;
                    case 11:
                        if (!(_i < alerts_1.length)) return [3, 14];
                        alert_1 = alerts_1[_i];
                        return [4, runHandlersOnAlert(alert_1)];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13:
                        _i++;
                        return [3, 11];
                    case 14: return [3, 3];
                    case 15: return [2];
                }
            });
        });
    };
}
exports.provideRunLive = provideRunLive;
