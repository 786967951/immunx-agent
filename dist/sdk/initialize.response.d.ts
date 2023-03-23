export interface BotSubscription {
    sensorId: string;
    alertId?: string;
    alertIds?: string[];
    chainId?: number;
}
export interface AlertConfig {
    subscriptions: BotSubscription[];
}
export interface InitializeResponse {
    alertConfig: AlertConfig;
}
