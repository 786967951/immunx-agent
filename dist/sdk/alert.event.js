"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertEvent = void 0;
var AlertEvent = (function () {
    function AlertEvent(alert) {
        this.alert = alert;
    }
    Object.defineProperty(AlertEvent.prototype, "alertId", {
        get: function () {
            return this.alert.alertId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "name", {
        get: function () {
            return this.alert.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "hash", {
        get: function () {
            return this.alertHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "alertHash", {
        get: function () {
            return this.alert.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "sensorId", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.alert.source) === null || _a === void 0 ? void 0 : _a.sensor) === null || _b === void 0 ? void 0 : _b.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "transactionHash", {
        get: function () {
            var _a;
            return (_a = this.alert.source) === null || _a === void 0 ? void 0 : _a.transactionHash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "blockHash", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.alert.source) === null || _a === void 0 ? void 0 : _a.block) === null || _b === void 0 ? void 0 : _b.hash;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "blockNumber", {
        get: function () {
            var _a, _b;
            return (_b = (_a = this.alert.source) === null || _a === void 0 ? void 0 : _a.block) === null || _b === void 0 ? void 0 : _b.number;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AlertEvent.prototype, "chainId", {
        get: function () {
            return this.alert.chainId;
        },
        enumerable: false,
        configurable: true
    });
    AlertEvent.prototype.hasAddress = function (address) {
        return this.alert.hasAddress(address);
    };
    return AlertEvent;
}());
exports.AlertEvent = AlertEvent;
