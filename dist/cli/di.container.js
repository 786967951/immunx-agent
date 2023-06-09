"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
var fs_1 = __importDefault(require("fs"));
var path_1 = require("path");
var awilix_1 = require("awilix");
var ethers_1 = require("ethers");
var shelljs_1 = __importDefault(require("shelljs"));
var prompts_1 = __importDefault(require("prompts"));
var jsonc_1 = require("jsonc");
var axios_1 = __importDefault(require("axios"));
var flat_cache_1 = __importDefault(require("flat-cache"));
var init_1 = __importDefault(require("./commands/init"));
var run_1 = __importDefault(require("./commands/run"));
var publish_1 = __importDefault(require("./commands/publish"));
var push_1 = __importDefault(require("./commands/push"));
var disable_1 = __importDefault(require("./commands/disable"));
var enable_1 = __importDefault(require("./commands/enable"));
var keyfile_1 = __importDefault(require("./commands/keyfile"));
var agent_controller_1 = __importDefault(require("./commands/run/server/agent.controller"));
var run_transaction_1 = require("./commands/run/run.transaction");
var run_block_1 = require("./commands/run/run.block");
var run_block_range_1 = require("./commands/run/run.block.range");
var run_file_1 = require("./commands/run/run.file");
var run_live_1 = require("./commands/run/run.live");
var server_1 = __importDefault(require("./commands/run/server"));
var upload_image_1 = __importDefault(require("./commands/publish/upload.image"));
var upload_manifest_1 = __importDefault(require("./commands/publish/upload.manifest"));
var push_to_registry_1 = __importDefault(require("./commands/publish/push.to.registry"));
var utils_1 = require("./utils");
var agent_registry_1 = __importDefault(require("./contracts/agent.registry"));
var get_agent_handlers_1 = require("./utils/get.agent.handlers");
var decrypt_keyfile_1 = require("./utils/decrypt.keyfile");
var create_keyfile_1 = require("./utils/create.keyfile");
var get_credentials_1 = __importDefault(require("./utils/get.credentials"));
var get_trace_data_1 = require("./utils/get.trace.data");
var sdk_1 = require("../sdk");
var get_python_agent_handlers_1 = require("./utils/get.python.agent.handlers");
var add_to_ipfs_1 = __importDefault(require("./utils/add.to.ipfs"));
var run_handlers_on_block_1 = require("./utils/run.handlers.on.block");
var run_handlers_on_transaction_1 = require("./utils/run.handlers.on.transaction");
var append_to_file_1 = __importDefault(require("./utils/append.to.file"));
var get_immunx_config_1 = __importDefault(require("./utils/get.immunx.config"));
var list_keyfiles_1 = __importDefault(require("./utils/list.keyfiles"));
var get_network_id_1 = __importDefault(require("./utils/get.network.id"));
var get_block_with_transactions_1 = __importDefault(require("./utils/get.block.with.transactions"));
var get_transaction_receipt_1 = __importDefault(require("./utils/get.transaction.receipt"));
var get_keyfile_1 = __importDefault(require("./utils/get.keyfile"));
var init_keystore_1 = __importDefault(require("./utils/init.keystore"));
var init_keyfile_1 = __importDefault(require("./utils/init.keyfile"));
var init_config_1 = __importDefault(require("./utils/init.config"));
var get_logs_for_block_1 = __importDefault(require("./utils/get.logs.for.block"));
var get_agent_logs_1 = require("./utils/get.agent.logs");
var logs_1 = __importDefault(require("./commands/logs"));
var info_1 = __importDefault(require("./commands/info"));
var get_from_ipfs_1 = __importDefault(require("./utils/ipfs/get.from.ipfs"));
var get_logs_from_polyscan_1 = __importDefault(require("./utils/polyscan/get.logs.from.polyscan"));
var run_alert_1 = require("./commands/run/run.alert");
var run_sequence_1 = require("./commands/run/run.sequence");
var run_handlers_on_alert_1 = require("./utils/run.handlers.on.alert");
var get_alert_1 = __importDefault(require("./utils/get.alert"));
var get_subscription_alerts_1 = require("./utils/get.subscription.alerts");
function configureContainer(args) {
    if (args === void 0) { args = {}; }
    var container = (0, awilix_1.createContainer)({ injectionMode: awilix_1.InjectionMode.CLASSIC });
    var bindings = {
        container: (0, awilix_1.asValue)(container),
        isProduction: (0, awilix_1.asValue)(process.env.NODE_ENV === 'production'),
        isDebug: (0, awilix_1.asFunction)(function (immunxConfig) { return immunxConfig.debug; }),
        shell: (0, awilix_1.asFunction)(function (isDebug) {
            shelljs_1.default.config.silent = isDebug ? false : true;
            return shelljs_1.default;
        }).singleton(),
        axios: (0, awilix_1.asValue)(axios_1.default),
        prompt: (0, awilix_1.asValue)(prompts_1.default),
        setInterval: (0, awilix_1.asValue)(setInterval),
        filesystem: (0, awilix_1.asValue)(fs_1.default),
        dynamicImport: (0, awilix_1.asValue)(function (path) { return Promise.resolve().then(function () { return __importStar(require(path)); }); }),
        cliCommandName: (0, awilix_1.asValue)(args.cliCommandName),
        cliVersion: (0, awilix_1.asFunction)(function () {
            try {
                var packageJsonPath = (0, path_1.join)(__dirname, "..", "..", "package.json");
                var packageJson = (0, utils_1.getJsonFile)(packageJsonPath);
                return packageJson.version;
            }
            catch (e) {
                throw new Error("unable to parse cli package.json: ".concat(e.message));
            }
        }).singleton(),
        cache: (0, awilix_1.asFunction)(function (immunxKeystore) { return flat_cache_1.default.load('cli-cache', immunxKeystore); }).singleton(),
        sleep: (0, awilix_1.asValue)(function (durationMs) { return new Promise(function (resolve) { return setTimeout(resolve, durationMs); }); }),
        args: (0, awilix_1.asValue)(args),
        contextPath: (0, awilix_1.asValue)(args.contextPath || process.cwd()),
        immunxKeystore: (0, awilix_1.asValue)((0, path_1.join)(os_1.default.homedir(), ".immunx")),
        getImmunxConfig: (0, awilix_1.asFunction)(get_immunx_config_1.default),
        immunxConfig: (0, awilix_1.asFunction)(function (getImmunxConfig) { return getImmunxConfig(); }).singleton(),
        configFilename: (0, awilix_1.asValue)("immunx.config.json"),
        localConfigFilename: (0, awilix_1.asFunction)(function (configFilename) {
            return args.config || configFilename;
        }).singleton(),
        init: (0, awilix_1.asFunction)(init_1.default),
        info: (0, awilix_1.asFunction)(info_1.default),
        run: (0, awilix_1.asFunction)(run_1.default),
        logs: (0, awilix_1.asFunction)(logs_1.default),
        publish: (0, awilix_1.asFunction)(publish_1.default),
        push: (0, awilix_1.asFunction)(push_1.default),
        disable: (0, awilix_1.asFunction)(disable_1.default),
        enable: (0, awilix_1.asFunction)(enable_1.default),
        keyfile: (0, awilix_1.asFunction)(keyfile_1.default),
        runProdServer: (0, awilix_1.asFunction)(server_1.default),
        runTransaction: (0, awilix_1.asFunction)(run_transaction_1.provideRunTransaction),
        runBlock: (0, awilix_1.asFunction)(run_block_1.provideRunBlock),
        runBlockRange: (0, awilix_1.asFunction)(run_block_range_1.provideRunBlockRange),
        runFile: (0, awilix_1.asFunction)(run_file_1.provideRunFile),
        runLive: (0, awilix_1.asFunction)(run_live_1.provideRunLive),
        runAlert: (0, awilix_1.asFunction)(run_alert_1.provideRunAlert),
        runSequence: (0, awilix_1.asFunction)(run_sequence_1.provideRunSequence),
        getCredentials: (0, awilix_1.asFunction)(get_credentials_1.default),
        uploadImage: (0, awilix_1.asFunction)(upload_image_1.default),
        uploadManifest: (0, awilix_1.asFunction)(upload_manifest_1.default),
        pushToRegistry: (0, awilix_1.asFunction)(push_to_registry_1.default),
        packageJson: (0, awilix_1.asFunction)(function (contextPath) {
            try {
                var packageJsonPath = (0, path_1.join)(contextPath, "package.json");
                return (0, utils_1.getJsonFile)(packageJsonPath);
            }
            catch (e) {
                throw new Error("unable to parse package.json: ".concat(e.message));
            }
        }).singleton(),
        agentName: (0, awilix_1.asFunction)(function (packageJson) { return packageJson.name; }).singleton(),
        description: (0, awilix_1.asFunction)(function (packageJson) { return packageJson.description; }).singleton(),
        agentId: (0, awilix_1.asFunction)(function (immunxConfig, agentName) {
            return immunxConfig.agentId || (0, utils_1.keccak256)(agentName);
        }).singleton(),
        chainIds: (0, awilix_1.asFunction)(function (packageJson) {
            var chainIds = packageJson.chainIds;
            if (!chainIds || !chainIds.length) {
                throw new Error("please specify chainIds array in package.json for where this agent should deploy e.g. [1] = Ethereum mainnet");
            }
            return chainIds.sort(function (a, b) { return a - b; });
        }).singleton(),
        chainSettings: (0, awilix_1.asFunction)(function (packageJson) {
            var chainSettings = packageJson.chainSettings;
            if (typeof chainSettings === "object") {
                return chainSettings;
            }
            return undefined;
        }).singleton(),
        version: (0, awilix_1.asFunction)(function (packageJson) { return packageJson.version; }),
        documentation: (0, awilix_1.asFunction)(function (contextPath) { return (0, path_1.join)(contextPath, 'README.md'); }).singleton(),
        repository: (0, awilix_1.asFunction)(function (packageJson) {
            var repository = packageJson.repository;
            if (typeof repository === 'string') {
                return repository;
            }
            else if (typeof repository === 'object') {
                return repository.url;
            }
            return undefined;
        }).singleton(),
        keyfileName: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.keyfile;
        }),
        keyfilePassword: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.keyfilePassword;
        }).singleton(),
        agentPath: (0, awilix_1.asFunction)(function (contextPath) {
            var agentPath = (0, path_1.join)(contextPath, "src", "agent");
            if (fs_1.default.existsSync((0, path_1.join)(contextPath, "src", "agent.ts"))) {
                var tsConfigPath = (0, path_1.join)(contextPath, "tsconfig.json");
                var compilerOptions = jsonc_1.jsonc.parse(fs_1.default.readFileSync(tsConfigPath, 'utf8')).compilerOptions;
                agentPath = (0, path_1.join)(contextPath, compilerOptions.outDir, "agent");
            }
            else if (fs_1.default.existsSync((0, path_1.join)(contextPath, "src", "agent.py"))) {
                agentPath = (0, path_1.join)(contextPath, "src", "agent.py");
            }
            return agentPath;
        }),
        getAgentHandlers: (0, awilix_1.asFunction)(get_agent_handlers_1.provideGetAgentHandlers).singleton(),
        getPythonAgentHandlers: (0, awilix_1.asFunction)(get_python_agent_handlers_1.provideGetPythonAgentHandlers),
        runHandlersOnBlock: (0, awilix_1.asFunction)(run_handlers_on_block_1.provideRunHandlersOnBlock),
        runHandlersOnTransaction: (0, awilix_1.asFunction)(run_handlers_on_transaction_1.provideRunHandlersOnTransaction),
        runHandlersOnAlert: (0, awilix_1.asFunction)(run_handlers_on_alert_1.provideRunHandlersOnAlert),
        getJsonFile: (0, awilix_1.asValue)(utils_1.getJsonFile),
        createBlockEvent: (0, awilix_1.asValue)(utils_1.createBlockEvent),
        createTransactionEvent: (0, awilix_1.asValue)(utils_1.createTransactionEvent),
        createAlertEvent: (0, awilix_1.asValue)(utils_1.createAlertEvent),
        getKeyfile: (0, awilix_1.asFunction)(get_keyfile_1.default),
        decryptKeyfile: (0, awilix_1.asFunction)(decrypt_keyfile_1.provideDecryptKeyfile),
        createKeyfile: (0, awilix_1.asFunction)(create_keyfile_1.provideCreateKeyfile),
        listKeyfiles: (0, awilix_1.asFunction)(list_keyfiles_1.default),
        addToIpfs: (0, awilix_1.asFunction)(add_to_ipfs_1.default),
        getFromIpfs: (0, awilix_1.asFunction)(get_from_ipfs_1.default),
        getLogsFromPolyscan: (0, awilix_1.asFunction)(get_logs_from_polyscan_1.default),
        appendToFile: (0, awilix_1.asFunction)(append_to_file_1.default),
        initKeystore: (0, awilix_1.asFunction)(init_keystore_1.default),
        initKeyfile: (0, awilix_1.asFunction)(init_keyfile_1.default),
        initConfig: (0, awilix_1.asFunction)(init_config_1.default),
        getNetworkId: (0, awilix_1.asFunction)(get_network_id_1.default),
        getBlockWithTransactions: (0, awilix_1.asFunction)(get_block_with_transactions_1.default),
        getTransactionReceipt: (0, awilix_1.asFunction)(get_transaction_receipt_1.default),
        getLogsForBlock: (0, awilix_1.asFunction)(get_logs_for_block_1.default),
        getAlert: (0, awilix_1.asFunction)(get_alert_1.default),
        getAlerts: (0, awilix_1.asValue)(sdk_1.getAlerts),
        getSubscriptionAlerts: (0, awilix_1.asFunction)(get_subscription_alerts_1.provideGetSubscriptionAlerts),
        getTraceData: (0, awilix_1.asFunction)(get_trace_data_1.provideGetTraceData),
        getAgentLogs: (0, awilix_1.asFunction)(get_agent_logs_1.provideGetAgentLogs),
        immunxApiUrl: (0, awilix_1.asValue)('https://api.immunx.network'),
        polyscanApiUrl: (0, awilix_1.asValue)('https://api.polygonscan.com/api'),
        traceRpcUrl: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.traceRpcUrl;
        }).singleton(),
        traceBlockMethod: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.traceBlockMethod || "trace_block";
        }).singleton(),
        traceTransactionMethod: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.traceTransactionMethod || "trace_transaction";
        }).singleton(),
        agentController: (0, awilix_1.asClass)(agent_controller_1.default),
        port: (0, awilix_1.asValue)(process.env.AGENT_GRPC_PORT || "50051"),
        imageRepositoryUrl: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.imageRepositoryUrl || "disco.immunx.network";
        }),
        imageRepositoryUsername: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.imageRepositoryUsername || "discouser";
        }),
        imageRepositoryPassword: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.imageRepositoryPassword || "discopass";
        }),
        agentRegistry: (0, awilix_1.asClass)(agent_registry_1.default),
        agentRegistryContractAddress: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.agentRegistryContractAddress || "0x61447385B019187daa48e91c55c02AF1F1f3F863";
        }),
        agentRegistryJsonRpcUrl: (0, awilix_1.asFunction)(function (immunxConfig) {
            var url = immunxConfig.agentRegistryJsonRpcUrl || "https://polygon-rpc.com/";
            if (!url.startsWith("http")) {
                throw new Error("agentRegistryJsonRpcUrl must begin with http(s)");
            }
            return url;
        }),
        jsonRpcUrl: (0, awilix_1.asFunction)(function (immunxConfig) {
            var jsonRpcUrl = immunxConfig.jsonRpcUrl || "https://cloudflare-eth.com/";
            if (!jsonRpcUrl.startsWith("http")) {
                throw new Error("jsonRpcUrl must begin with http(s)");
            }
            return jsonRpcUrl;
        }),
        ethersProvider: (0, awilix_1.asFunction)(function (jsonRpcUrl) { return new ethers_1.ethers.providers.JsonRpcProvider(jsonRpcUrl); }).singleton(),
        ethersAgentRegistryProvider: (0, awilix_1.asFunction)(function (agentRegistryJsonRpcUrl) { return new ethers_1.ethers.providers.JsonRpcProvider(agentRegistryJsonRpcUrl); }).singleton(),
        ipfsGatewayUrl: (0, awilix_1.asFunction)(function (immunxConfig) {
            return immunxConfig.ipfsGatewayUrl || "https://ipfs.immunx.network";
        }),
        ipfsGatewayAuth: (0, awilix_1.asFunction)(function (ipfsGatewayUrl, immunxConfig) {
            if (ipfsGatewayUrl.includes('ipfs.infura.io') && !immunxConfig.ipfsGatewayAuth) {
                throw new Error("no ipfsGatewayAuth provided in config");
            }
            return immunxConfig.ipfsGatewayAuth;
        }),
        ipfsHttpClient: (0, awilix_1.asFunction)(function (ipfsGatewayUrl, ipfsGatewayAuth) {
            var options = { baseURL: ipfsGatewayUrl };
            if (ipfsGatewayAuth) {
                options['headers'] = {
                    authorization: ipfsGatewayAuth
                };
            }
            return axios_1.default.create(options);
        }).singleton(),
        immunxIpfsHttpClient: (0, awilix_1.asFunction)(function () {
            var options = { baseURL: "https://ipfs.immunx.network" };
            return axios_1.default.create(options);
        }).singleton()
    };
    container.register(bindings);
    return container;
}
exports.default = configureContainer;
;
