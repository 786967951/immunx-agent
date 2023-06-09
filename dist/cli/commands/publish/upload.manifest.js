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
var ethers_1 = require("ethers");
var utils_1 = require("../../utils");
function provideUploadManifest(filesystem, addToIpfs, agentName, description, agentId, version, documentation, repository, cliVersion, chainIds, chainSettings) {
    (0, utils_1.assertExists)(filesystem, 'filesystem');
    (0, utils_1.assertExists)(addToIpfs, 'addToIpfs');
    (0, utils_1.assertIsNonEmptyString)(agentName, 'agentName');
    (0, utils_1.assertIsNonEmptyString)(description, 'description');
    (0, utils_1.assertIsNonEmptyString)(agentId, 'agentId');
    (0, utils_1.assertIsNonEmptyString)(version, 'version');
    (0, utils_1.assertIsNonEmptyString)(documentation, 'documentation');
    (0, utils_1.assertIsNonEmptyString)(cliVersion, 'cliVersion');
    (0, utils_1.assertExists)(chainIds, 'chainIds');
    (0, utils_1.assertIsValidChainSettings)(chainSettings);
    return function uploadManifest(imageReference, privateKey) {
        return __awaiter(this, void 0, void 0, function () {
            var documentationFile, documentationReference, manifest, signingKey, signature, manifestReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!filesystem.existsSync(documentation)) {
                            throw new Error("documentation file ".concat(documentation, " not found"));
                        }
                        if (!filesystem.statSync(documentation).size) {
                            throw new Error("documentation file ".concat(documentation, " cannot be empty"));
                        }
                        console.log('pushing agent documentation to IPFS...');
                        documentationFile = filesystem.readFileSync(documentation, 'utf8');
                        return [4, addToIpfs(documentationFile)];
                    case 1:
                        documentationReference = _a.sent();
                        manifest = {
                            from: new ethers_1.Wallet(privateKey).address,
                            name: agentName,
                            description: description,
                            agentId: agentName,
                            agentIdHash: agentId,
                            version: version,
                            timestamp: new Date().toUTCString(),
                            imageReference: imageReference,
                            documentation: documentationReference,
                            repository: repository,
                            chainIds: chainIds,
                            publishedFrom: "Immunx CLI ".concat(cliVersion),
                            chainSettings: chainSettings,
                        };
                        signingKey = new ethers_1.ethers.utils.SigningKey(privateKey);
                        signature = ethers_1.ethers.utils.joinSignature(signingKey.signDigest((0, utils_1.keccak256)(JSON.stringify(manifest))));
                        console.log('pushing agent manifest to IPFS...');
                        return [4, addToIpfs(JSON.stringify({ manifest: manifest, signature: signature }))];
                    case 2:
                        manifestReference = _a.sent();
                        return [2, manifestReference];
                }
            });
        });
    };
}
exports.default = provideUploadManifest;
