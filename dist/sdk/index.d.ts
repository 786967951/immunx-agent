import { ethers } from "ethers";
import { Finding, FindingSeverity, FindingType } from "./finding";
import { Label, EntityType } from "./label";
import { BlockEvent } from "./block.event";
import { AlertEvent } from "./alert.event";
import { Block } from "./block";
import { Alert } from "./alert";
import { TransactionEvent, TxEventBlock, LogDescription } from "./transaction.event";
import { Log, Receipt } from "./receipt";
import { Trace, TraceAction, TraceResult } from "./trace";
import { Transaction } from "./transaction";
import { createBlockEvent, createTransactionEvent, createAlertEvent, getJsonRpcUrl, getEthersProvider, getEthersBatchProvider, keccak256, setPrivateFindings, isPrivateFindings, getTransactionReceipt, getAlerts } from "./utils";
import { fetchJwt, decodeJwt, verifyJwt, MOCK_JWT } from "./jwt";
import { InitializeResponse } from "./initialize.response";
import { BloomFilter } from "./bloom.filter";
interface DiContainer {
    resolve<T>(key: string): T;
}
declare type ConfigureContainer = (args?: object) => DiContainer;
declare const configureContainer: ConfigureContainer;
interface ImmunxConfig {
    agentId?: string;
    jsonRpcUrl?: string;
    ipfsGatewayUrl?: string;
    ipfsGatewayAuth?: string;
    imageRepositoryUrl?: string;
    imageRepositoryUsername?: string;
    imageRepositoryPassword?: string;
    agentRegistryContractAddress?: string;
    agentRegistryJsonRpcUrl?: string;
    debug?: boolean;
    traceRpcUrl?: string;
    traceBlockMethod?: string;
    traceTransactionMethod?: string;
    keyfile?: string;
    keyfilePassword?: string;
}
declare type Initialize = () => Promise<InitializeResponse | void>;
declare type HandleTransaction = (txEvent: TransactionEvent) => Promise<Finding[]>;
declare type HandleBlock = (blockEvent: BlockEvent) => Promise<Finding[]>;
declare type HandleAlert = (alertEvent: AlertEvent) => Promise<Finding[]>;
declare enum EventType {
    BLOCK = 0,
    REORG = 1
}
declare enum Network {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    POLYGON = 137,
    BSC = 56,
    AVALANCHE = 43114,
    ARBITRUM = 42161,
    OPTIMISM = 10,
    FANTOM = 250
}
export { ImmunxConfig, Initialize, HandleTransaction, HandleBlock, HandleAlert, Finding, FindingSeverity, FindingType, Label, EntityType, BlockEvent, TransactionEvent, AlertEvent, TxEventBlock, Alert, Block, Transaction, Receipt, Log, LogDescription, Trace, TraceAction, TraceResult, EventType, Network, getJsonRpcUrl, createTransactionEvent, createBlockEvent, createAlertEvent, getEthersProvider, getEthersBatchProvider, ethers, keccak256, setPrivateFindings, isPrivateFindings, configureContainer, getTransactionReceipt, getAlerts, fetchJwt, decodeJwt, verifyJwt, BloomFilter, MOCK_JWT };
