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
exports.formatDate = exports.formatIpfsData = void 0;
var agent_registry_1 = require("../../contracts/agent.registry");
var utils_1 = require("../../utils");
var lodash_1 = require("lodash");
function provideInfo(agentId, args, ethersAgentRegistryProvider, agentRegistry, agentRegistryContractAddress, getFromIpfs, getLogsFromPolyscan) {
    (0, utils_1.assertExists)(args, 'args');
    (0, utils_1.assertExists)(ethersAgentRegistryProvider, 'ethersAgentRegistryProvider');
    (0, utils_1.assertExists)(agentRegistry, 'agentRegistry');
    (0, utils_1.assertExists)(agentRegistryContractAddress, 'agentRegistryContractAddress');
    (0, utils_1.assertExists)(getFromIpfs, 'getFromIpfs');
    (0, utils_1.assertExists)(getLogsFromPolyscan, 'getLogsFromPolyscan');
    return function info() {
        return __awaiter(this, void 0, void 0, function () {
            var finalAgentId, _a, agent, currentState, _b, _c, _d, ipfsMetaHash, ipfsData, eventTopicFilters, logs, filteredLogs, _i, filteredLogs_1, log, eventName;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        finalAgentId = args.agentId ? args.agentId : agentId;
                        (0, utils_1.assertIsNonEmptyString)(finalAgentId, 'agentId');
                        console.log("Fetching sensor info...");
                        _c = (_b = Promise).all;
                        return [4, agentRegistry.getAgent(finalAgentId)];
                    case 1:
                        _d = [
                            _e.sent()
                        ];
                        return [4, agentRegistry.isEnabled(finalAgentId)];
                    case 2: return [4, _c.apply(_b, [_d.concat([
                                _e.sent()
                            ])])];
                    case 3:
                        _a = _e.sent(), agent = _a[0], currentState = _a[1];
                        ipfsMetaHash = agent.metadata;
                        return [4, getFromIpfs(ipfsMetaHash)];
                    case 4:
                        ipfsData = (_e.sent()).manifest;
                        eventTopicFilters = agent_registry_1.AGENT_REGISTRY_EVENT_FRAGMENTS
                            .filter(function (fragment) { return ((0, agent_registry_1.isRelevantSmartContractEvent)(fragment.name)); })
                            .map(function (eventFragment) {
                            return {
                                type: eventFragment.name,
                                topicHash: (0, agent_registry_1.getTopicHashFromEventName)(eventFragment.name)
                            };
                        });
                        logs = [];
                        return [4, Promise.all(eventTopicFilters.map(function (filter) { return __awaiter(_this, void 0, void 0, function () {
                                var eventLogs;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4, getLogsFromPolyscan(agentRegistryContractAddress, filter, finalAgentId)];
                                        case 1:
                                            eventLogs = _a.sent();
                                            logs.push.apply(logs, eventLogs);
                                            return [2];
                                    }
                                });
                            }); }))];
                    case 5:
                        _e.sent();
                        filteredLogs = filterSimultaneousEventsOnBotCreation(logs);
                        filteredLogs.sort(function (logOne, logTwo) { return logOne.timeStamp < logTwo.timeStamp ? 1 : -1; });
                        printIpfsMetaData(ipfsData, currentState);
                        console.log("Recent Activity: \n");
                        for (_i = 0, filteredLogs_1 = filteredLogs; _i < filteredLogs_1.length; _i++) {
                            log = filteredLogs_1[_i];
                            eventName = (0, agent_registry_1.getEventNameFromTopicHash)(log.topics[0]);
                            console.log(" [".concat((0, exports.formatDate)(new Date(log.timeStamp * 1000)), "] ").concat(formatEventName(eventName), " by ").concat(ipfsData.from, " (https://polygonscan.com/tx/").concat(log.transactionHash, ")\n"));
                        }
                        return [2];
                }
            });
        });
    };
}
exports.default = provideInfo;
var formatIpfsData = function (data, isBotEnabled) {
    return {
        name: data.name,
        agentId: data.agentIdHash,
        status: isBotEnabled ? "Enabled" : "Disabled",
        version: data.version,
        owner: data.from,
        image: data.imageReference,
        publishedFrom: data.publishedFrom,
        timestamp: (0, exports.formatDate)(new Date(data.timestamp)),
        documentation: " https://ipfs.io/ipfs/".concat(data.documentation)
    };
};
exports.formatIpfsData = formatIpfsData;
var printIpfsMetaData = function (ipfsData, sensorStatus) {
    var formattedData = (0, exports.formatIpfsData)(ipfsData, sensorStatus);
    console.log("\n");
    Object.entries(formattedData).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        return console.log("".concat(key, ": ").concat(value));
    });
    console.log("\n");
};
var formatEventName = function (eventName) {
    if (eventName === "Transfer") {
        return "Bot Created";
    }
    return eventName.replace("Agent", "Bot ");
};
var formatDate = function (date) {
    var timeFormatter = new Intl.DateTimeFormat('default', { hour: 'numeric', minute: '2-digit', second: '2-digit', timeZoneName: 'short', hour12: false });
    var monthFormatter = new Intl.DateTimeFormat('default', { month: 'short', year: "numeric" });
    var dayFormatter = new Intl.DateTimeFormat('default', { day: '2-digit' });
    return "".concat(dayFormatter.format(date), " ").concat(monthFormatter.format(date), " ").concat(timeFormatter.format(date));
};
exports.formatDate = formatDate;
var filterSimultaneousEventsOnBotCreation = function (logs) {
    return (0, lodash_1.chain)(logs)
        .groupBy("timeStamp")
        .map(function (value) {
        var transferEvent = value.find(function (el) { return el.topics[0] === (0, agent_registry_1.getTopicHashFromEventName)("Transfer"); });
        if (value.length > 1 && transferEvent) {
            return [transferEvent];
        }
        return value;
    })
        .flatten()
        .value();
};
