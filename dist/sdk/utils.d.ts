import { Alert, AlertEvent, BlockEvent, EventType, Network, Trace, TransactionEvent } from '.';
import { Transaction } from './transaction';
import { Log, Receipt } from './receipt';
import { TxEventBlock } from './transaction.event';
import { Block } from './block';
import { ethers } from '.';
import { AlertQueryOptions, AlertsResponse } from './graphql/immunx';
export declare const getEthersProvider: () => ethers.providers.JsonRpcProvider;
export declare const getEthersBatchProvider: () => ethers.providers.JsonRpcBatchProvider;
export declare const getJsonRpcUrl: () => string;
export declare const getTransactionReceipt: (txHash: string) => Promise<Receipt>;
export declare const createTransactionEvent: ({ type, network, transaction, traces, addresses, block, logs, contractAddress }: {
    type?: EventType | undefined;
    network?: Network | undefined;
    transaction: Transaction;
    traces?: Trace[] | undefined;
    addresses?: {
        [key: string]: boolean;
    } | undefined;
    block: TxEventBlock;
    logs: Log[];
    contractAddress: string | null;
}) => TransactionEvent;
export declare const createBlockEvent: ({ type, network, block }: {
    type?: EventType | undefined;
    network?: Network | undefined;
    block: Block;
}) => BlockEvent;
export declare const createAlertEvent: ({ alert }: {
    alert: Alert;
}) => AlertEvent;
export declare const assertExists: (obj: any, objName: string) => void;
export declare const assertIsNonEmptyString: (str: string, varName: string) => void;
export declare const assertIsFromEnum: (value: any, Enum: any, varName: string) => void;
export declare const keccak256: (str: string) => string;
export declare const setPrivateFindings: (isPrivate: boolean) => void;
export declare const isPrivateFindings: () => boolean;
export declare const getAlerts: (query: AlertQueryOptions) => Promise<AlertsResponse>;
