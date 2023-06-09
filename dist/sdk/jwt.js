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
exports.verifyJwt = exports.decodeJwt = exports.fetchJwt = exports.provideFetchJwt = exports.MOCK_JWT = void 0;
var _1 = require(".");
var strings_1 = require("@ethersproject/strings");
var axios_1 = __importDefault(require("axios"));
var utils_1 = require("./utils");
exports.MOCK_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib3QtaWQiOiIweDEzazM4N2IzNzc2OWNlMjQyMzZjNDAzZTc2ZmMzMGYwMWZhNzc0MTc2ZTE0MTZjODYxeWZlNmMwN2RmZWY3MWYiLCJleHAiOjE2NjAxMTk0NDMsImlhdCI6MTY2MDExOTQxMywianRpIjoicWtkNWNmYWQtMTg4NC0xMWVkLWE1YzktMDI0MjBhNjM5MzA4IiwibmJmIjoxNjYwMTE5MzgzLCJzdWIiOiIweDU1NmY4QkU0MmY3NmMwMUY5NjBmMzJDQjE5MzZEMmUwZTBFYjNGNEQifQ.9v5OiiYhDoEbhZ-abbiSXa5y-nQXa104YCN_2mK7SP0";
var provideFetchJwt = function (axios) {
    (0, utils_1.assertExists)(axios, "axios");
    return function fetchJwt(claims, expiresAt) {
        return __awaiter(this, void 0, void 0, function () {
            var hostname, port, path, fullClaims, expInSec, safeExpInSec, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (process.env.NODE_ENV !== "production")
                            return [2, exports.MOCK_JWT];
                        hostname = "immunx-jwt-provider";
                        port = 8515;
                        path = "/create";
                        fullClaims = __assign({}, claims);
                        if (expiresAt) {
                            expInSec = Math.floor(expiresAt.getTime() / 1000);
                            safeExpInSec = expInSec > Number.MAX_SAFE_INTEGER ? Number.MAX_SAFE_INTEGER : expInSec;
                            fullClaims = __assign({ exp: safeExpInSec }, fullClaims);
                        }
                        return [4, axios.post("http://".concat(hostname, ":").concat(port).concat(path), {
                                claims: fullClaims,
                            })];
                    case 1:
                        response = _a.sent();
                        return [2, response.data.token];
                }
            });
        });
    };
};
exports.provideFetchJwt = provideFetchJwt;
exports.fetchJwt = (0, exports.provideFetchJwt)(axios_1.default);
var decodeJwt = function (token) {
    var splitJwt = token.split(".");
    var header = JSON.parse(Buffer.from(splitJwt[0], "base64").toString());
    var payload = JSON.parse(Buffer.from(splitJwt[1], "base64").toString());
    return {
        header: header,
        payload: payload,
    };
};
exports.decodeJwt = decodeJwt;
var verifyJwt = function (token, polygonRpcUrl) {
    if (polygonRpcUrl === void 0) { polygonRpcUrl = "https://polygon-rpc.com"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var splitJwt, rawHeader, rawPayload, header, payload, sensorId, expiresAt, algorithm, signerAddress, currentUnixTime, digest, signature, recoveredSignerAddress, polygonProvider, DISPTACHER_ARE_THEY_LINKED, DISPATCH_CONTRACT, dispatchContract, areTheyLinked;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    splitJwt = token.split(".");
                    rawHeader = splitJwt[0];
                    rawPayload = splitJwt[1];
                    header = JSON.parse(Buffer.from(rawHeader, "base64").toString());
                    payload = JSON.parse(Buffer.from(rawPayload, "base64").toString());
                    sensorId = payload["sensor-id"];
                    expiresAt = payload["exp"];
                    algorithm = header === null || header === void 0 ? void 0 : header.alg;
                    if (algorithm !== "ETH") {
                        console.warn("Unexpected signing method: ".concat(algorithm));
                        return [2, false];
                    }
                    if (!sensorId) {
                        console.warn("Invalid claim");
                        return [2, false];
                    }
                    signerAddress = payload === null || payload === void 0 ? void 0 : payload.sub;
                    if (!signerAddress) {
                        console.warn("Invalid claim");
                        return [2, false];
                    }
                    currentUnixTime = Math.floor(Date.now() / 1000);
                    if (expiresAt < currentUnixTime) {
                        console.warn("Jwt is expired");
                        return [2, false];
                    }
                    digest = _1.ethers.utils.keccak256((0, strings_1.toUtf8Bytes)("".concat(rawHeader, ".").concat(rawPayload)));
                    signature = "0x".concat(Buffer.from(splitJwt[2], "base64").toString("hex"));
                    recoveredSignerAddress = _1.ethers.utils.recoverAddress(digest, signature);
                    if (recoveredSignerAddress !== signerAddress) {
                        console.warn("Signature invalid: expected=".concat(signerAddress, ", got=").concat(recoveredSignerAddress));
                        return [2, false];
                    }
                    polygonProvider = new _1.ethers.providers.JsonRpcProvider(polygonRpcUrl);
                    DISPTACHER_ARE_THEY_LINKED = "function areTheyLinked(uint256 agentId, uint256 scannerId) external view returns(bool)";
                    DISPATCH_CONTRACT = "0xd46832F3f8EA8bDEFe5316696c0364F01b31a573";
                    dispatchContract = new _1.ethers.Contract(DISPATCH_CONTRACT, [DISPTACHER_ARE_THEY_LINKED], polygonProvider);
                    return [4, dispatchContract.areTheyLinked(sensorId, recoveredSignerAddress)];
                case 1:
                    areTheyLinked = _a.sent();
                    return [2, areTheyLinked];
            }
        });
    });
};
exports.verifyJwt = verifyJwt;
