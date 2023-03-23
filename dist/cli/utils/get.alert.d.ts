import { Alert } from "../../sdk";
import { Cache } from "flat-cache";
import { AlertQueryOptions, AlertsResponse } from "../../sdk/graphql/immunx";
export declare type GetAlert = (alertHash: string) => Promise<Alert>;
export declare const ONE_DAY_IN_MS = 86400000;
export declare const LOOKBACK_PERIOD_DAYS = 90;
export default function provideGetAlert(getAlerts: (q: AlertQueryOptions) => Promise<AlertsResponse>, cache: Cache): (alertHash: string) => Promise<Alert>;
export declare const getCacheKey: (alertHash: string) => string;
