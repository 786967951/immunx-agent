export declare enum EntityType {
    Unknown = 0,
    Address = 1,
    Transaction = 2,
    Block = 3,
    Url = 4
}
export declare const ENTITY_TYPE_STRING_TO_ENUM: {
    UNKNOWN: EntityType;
    ADDRESS: EntityType;
    TRANSACTION: EntityType;
    BLOCK: EntityType;
    URL: EntityType;
};
declare type LabelInput = {
    entityType: EntityType;
    entity: string;
    label: string;
    confidence: number;
    remove?: boolean;
    metadata?: string[];
};
export declare class Label {
    readonly entityType: EntityType;
    readonly entity: string;
    readonly label: string;
    readonly confidence: number;
    readonly remove: boolean;
    readonly metadata: string[];
    private constructor();
    static fromObject({ entityType, entity, label, confidence, remove, metadata, }: LabelInput): Label;
}
export {};
