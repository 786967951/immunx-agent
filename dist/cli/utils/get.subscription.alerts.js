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
exports.provideGetSubscriptionAlerts = void 0;
var _1 = require(".");
function provideGetSubscriptionAlerts(getAlerts) {
    (0, _1.assertExists)(getAlerts, "getAlerts");
    return function getSubscriptionAlerts(subscriptions, createdSince) {
        return __awaiter(this, void 0, void 0, function () {
            var chainIdQueries, _i, subscriptions_1, subscription, queries, _a, _b, chainId, alertArrays, alerts, _c, alertArrays_1, array;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (subscriptions.length == 0)
                            return [2, []];
                        chainIdQueries = new Map();
                        for (_i = 0, subscriptions_1 = subscriptions; _i < subscriptions_1.length; _i++) {
                            subscription = subscriptions_1[_i];
                            if (subscription.chainId == undefined) {
                                subscription.chainId = 0;
                            }
                            appendToChainIdQuery(chainIdQueries, subscription);
                        }
                        queries = [];
                        for (_a = 0, _b = Array.from(chainIdQueries.keys()); _a < _b.length; _a++) {
                            chainId = _b[_a];
                            queries.push(runQuery(chainId, chainIdQueries.get(chainId), createdSince, getAlerts));
                        }
                        return [4, Promise.all(queries)];
                    case 1:
                        alertArrays = _d.sent();
                        alerts = [];
                        for (_c = 0, alertArrays_1 = alertArrays; _c < alertArrays_1.length; _c++) {
                            array = alertArrays_1[_c];
                            alerts.push.apply(alerts, array);
                        }
                        return [2, alerts];
                }
            });
        });
    };
}
exports.provideGetSubscriptionAlerts = provideGetSubscriptionAlerts;
function runQuery(chainId, _a, createdSince, getAlerts) {
    var _b;
    var sensorIds = _a.sensorIds, alertIds = _a.alertIds;
    return __awaiter(this, void 0, void 0, function () {
        var alerts, query, response, now;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    alerts = [];
                    now = new Date();
                    _c.label = 1;
                case 1:
                    query = {
                        sensorIds: Array.from(sensorIds),
                        createdSince: now.getTime() - createdSince.getTime(),
                        first: 1000,
                        startingCursor: response === null || response === void 0 ? void 0 : response.pageInfo.endCursor,
                    };
                    if (chainId > 0) {
                        query.chainId = chainId;
                    }
                    if (alertIds.size > 0) {
                        query.alertIds = Array.from(alertIds);
                    }
                    return [4, getAlerts(query)];
                case 2:
                    response = _c.sent();
                    alerts.push.apply(alerts, response.alerts);
                    _c.label = 3;
                case 3:
                    if ((_b = response.pageInfo) === null || _b === void 0 ? void 0 : _b.hasNextPage) return [3, 1];
                    _c.label = 4;
                case 4: return [2, alerts];
            }
        });
    });
}
function appendToChainIdQuery(chainIdQueries, subscription) {
    var chainId = subscription.chainId;
    if (!chainIdQueries.has(chainId)) {
        chainIdQueries.set(chainId, {
            sensorIds: new Set(),
            alertIds: new Set(),
        });
    }
    var sensorId = subscription.sensorId, alertId = subscription.alertId, alertIds = subscription.alertIds;
    var chainIdQuery = chainIdQueries.get(chainId);
    chainIdQuery.sensorIds.add(sensorId);
    if (alertId) {
        chainIdQuery.alertIds.add(alertId);
    }
    if (alertIds) {
        for (var _i = 0, alertIds_1 = alertIds; _i < alertIds_1.length; _i++) {
            var alertId_1 = alertIds_1[_i];
            chainIdQuery.alertIds.add(alertId_1);
        }
    }
}
