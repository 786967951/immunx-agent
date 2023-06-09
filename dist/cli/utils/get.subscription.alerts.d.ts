import { Alert } from "../../sdk";
import { AlertQueryOptions, AlertsResponse } from "../../sdk/graphql/immunx";
import { BotSubscription } from "../../sdk/initialize.response";
export declare type GetSubscriptionAlerts = (subscriptions: BotSubscription[], createdSince: Date) => Promise<Alert[]>;
export declare function provideGetSubscriptionAlerts(getAlerts: (q: AlertQueryOptions) => Promise<AlertsResponse>): GetSubscriptionAlerts;
