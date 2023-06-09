import { ShellString } from 'shelljs';
import { Alert, AlertEvent, BlockEvent, Finding, TransactionEvent } from "../../sdk";
import { Trace } from '../../sdk/trace';
import { JsonRpcBlock, JsonRpcTransaction } from './get.block.with.transactions';
import { JsonRpcLog } from './get.transaction.receipt';
export declare type GetJsonFile = (filePath: string) => any;
export declare const getJsonFile: GetJsonFile;
export declare const assertExists: (obj: any, objName: string) => void;
export declare const assertIsNonEmptyString: (str: string, varName: string) => void;
export declare const assertIsISOString: (str: string, fieldName?: string) => void;
export declare const assertShellResult: (result: ShellString, errMsg: string) => void;
export declare const assertFindings: (findings: Finding[]) => void;
export declare const assertIsValidChainSettings: (chainSettings?: any) => void;
export declare const isValidTimeRange: (earliestTimestamp: Date, latestTimestamp: Date) => boolean;
export declare const keccak256: (str: string) => string;
export declare const formatAddress: (address: string) => string;
export declare const isZeroAddress: (address: string | null) => boolean;
export declare type CreateBlockEvent = (block: JsonRpcBlock, networkId: number) => BlockEvent;
export declare const createBlockEvent: CreateBlockEvent;
export declare type CreateTransactionEvent = (transaction: JsonRpcTransaction, block: JsonRpcBlock, networkId: number, traces: Trace[], logs: JsonRpcLog[]) => TransactionEvent;
export declare const createTransactionEvent: CreateTransactionEvent;
export declare type CreateAlertEvent = (alert: Alert) => AlertEvent;
export declare const createAlertEvent: CreateAlertEvent;
export interface BlockchainNetworkConfig {
    chainId: number;
    blockTimeInSeconds: number;
}
export declare const getBlockChainNetworkConfig: (chainId: number) => BlockchainNetworkConfig;
