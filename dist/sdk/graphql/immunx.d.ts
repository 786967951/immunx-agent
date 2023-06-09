import { Alert } from '../alert';
export declare const IMMUNX_GRAPHQL_URL = "https://api.immunx.network/graphql";
interface AlertCursor {
    alertId: string;
    blockNumber: number;
}
export interface AlertQueryOptions {
    sensorIds?: string[];
    addresses?: string[];
    alertHash?: string;
    alertName?: string;
    alertId?: string;
    alertIds?: string[];
    chainId?: number;
    createdSince?: number;
    createdBefore?: number;
    first?: number;
    startingCursor?: AlertCursor;
    projectId?: string;
    scanNodeConfirmations?: {
        gte: number;
        lte: number;
    };
    severities?: string[];
    transactionHash?: string;
    blockSortDirection?: "desc" | "asc";
    blockDateRange?: {
        startDate: Date;
        endDate: Date;
    };
    blockNumberRange?: {
        startBlockNumber: number;
        endBlockNumber: number;
    };
}
export interface AlertsResponse {
    alerts: Alert[];
    pageInfo: {
        hasNextPage: boolean;
        endCursor?: {
            alertId: string;
            blockNumber: number;
        };
    };
}
export interface RawGraphqlAlertResponse {
    data: {
        data: {
            alerts: AlertsResponse;
        };
        errors: any;
    };
}
export declare const getQueryFromAlertOptions: (options: AlertQueryOptions) => {
    operationName: string;
    query: string;
    variables: {
        sensors: string[] | undefined;
        addresses: string[] | undefined;
        after: AlertCursor | undefined;
        alertId: string | undefined;
        chainId: number | undefined;
        first: number | undefined;
        projectId: string | undefined;
        scanNodeConfirmations: {
            gte: number;
            lte: number;
        } | undefined;
        severities: string[] | undefined;
        transactionHash: string | undefined;
        blockSortDirection: "desc" | "asc" | undefined;
        createdSince: number | undefined;
        createdBefore: number | undefined;
        blockDateRange: {
            startDate: string;
            endDate: string;
        } | undefined;
        blockNumberRange: {
            startBlockNumber: number;
            endBlockNumber: number;
        } | undefined;
        alertIds: string[] | undefined;
        alertHash: string | undefined;
        alertName: string | undefined;
    };
};
export {};
