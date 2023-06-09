export = AgentController;
declare class AgentController {
    constructor(getAgentHandlers: any);
    getAgentHandlers: any;
    isInitialized: boolean;
    initializeResponse: {};
    Initialize(call: any, callback: any): Promise<void>;
    EvaluateBlock(call: any, callback: any): Promise<void>;
    EvaluateTx(call: any, callback: any): Promise<void>;
    EvaluateAlert(call: any, callback: any): Promise<void>;
    initializeAgentHandlers(): Promise<void>;
    initialize: any;
    handleBlock: any;
    handleTransaction: any;
    handleAlert: any;
    createBlockEventFromGrpcRequest(request: any): BlockEvent;
    createAlertEventFromGrpcRequest(request: any): AlertEvent;
    createTransactionEventFromGrpcRequest(request: any): TransactionEvent;
}
import { BlockEvent } from "../../../../sdk";
import { AlertEvent } from "../../../../sdk";
import { TransactionEvent } from "../../../../sdk";
