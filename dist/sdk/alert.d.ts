import { Label } from "./label";
export declare type AlertContract = {
    address: string;
    name: string;
    projectId?: string;
};
export declare type AlertSource = {
    transactionHash?: string;
    block?: {
        timestamp: string;
        chainId: number;
        hash: string;
        number: number;
    };
    sensor?: {
        id?: string;
        reference?: string;
        image?: string;
    };
    sourceAlert?: {
        hash?: string;
        sensorId?: string;
        timestamp?: string;
        chainId?: number;
    };
};
export declare type AlertProject = {
    id: string;
    name: string;
    contacts?: {
        securityEmailAddress?: string;
        generalEmailAddress?: string;
    };
    website?: string;
    token?: {
        symbol?: string;
        name?: string;
        decimals?: number;
        chainId: number;
        address: string;
    };
    social?: {
        twitter?: string;
        github?: string;
        everest?: string;
        coingecko?: string;
    };
};
export declare type AlertAddressBloomFilter = {
    bitset: string;
    k: string;
    m: string;
};
declare type AlertInput = {
    addresses?: string[];
    alertId?: string;
    hash?: string;
    contracts?: AlertContract[];
    createdAt?: string;
    description?: string;
    findingType?: string;
    name?: string;
    protocol?: string;
    scanNodeCount?: number;
    severity?: string;
    alertDocumentType?: string;
    relatedAlerts?: string[];
    chainId?: number;
    labels?: Label[];
    source?: AlertSource;
    metadata?: any;
    projects?: AlertProject[];
    addressBloomFilter?: AlertAddressBloomFilter;
};
export declare class Alert {
    readonly addresses?: string[] | undefined;
    readonly alertId?: string | undefined;
    readonly hash?: string | undefined;
    readonly contracts?: AlertContract[] | undefined;
    readonly createdAt?: string | undefined;
    readonly description?: string | undefined;
    readonly findingType?: string | undefined;
    readonly name?: string | undefined;
    readonly protocol?: string | undefined;
    readonly scanNodeCount?: number | undefined;
    readonly severity?: string | undefined;
    readonly alertDocumentType?: string | undefined;
    readonly relatedAlerts?: string[] | undefined;
    readonly chainId?: number | undefined;
    readonly labels?: Label[] | undefined;
    readonly source?: AlertSource | undefined;
    readonly metadata?: any;
    readonly projects?: AlertProject[] | undefined;
    readonly addressBloomFilter?: AlertAddressBloomFilter | undefined;
    private readonly addressFilter?;
    private constructor();
    hasAddress(address: string): boolean;
    toString(): string;
    static fromObject({ addresses, alertId, hash, contracts, createdAt, description, findingType, name, protocol, scanNodeCount, severity, alertDocumentType, relatedAlerts, chainId, labels, source, metadata, projects, addressBloomFilter, }: AlertInput): Alert;
}
export {};
