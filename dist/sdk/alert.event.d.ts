import { Alert } from "./alert";
export declare class AlertEvent {
    readonly alert: Alert;
    constructor(alert: Alert);
    get alertId(): string | undefined;
    get name(): string | undefined;
    get hash(): string | undefined;
    get alertHash(): string | undefined;
    get sensorId(): string | undefined;
    get transactionHash(): string | undefined;
    get blockHash(): string | undefined;
    get blockNumber(): number | undefined;
    get chainId(): number | undefined;
    hasAddress(address: string): boolean;
}
