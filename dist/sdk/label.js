"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.ENTITY_TYPE_STRING_TO_ENUM = exports.EntityType = void 0;
var EntityType;
(function (EntityType) {
    EntityType[EntityType["Unknown"] = 0] = "Unknown";
    EntityType[EntityType["Address"] = 1] = "Address";
    EntityType[EntityType["Transaction"] = 2] = "Transaction";
    EntityType[EntityType["Block"] = 3] = "Block";
    EntityType[EntityType["Url"] = 4] = "Url";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
exports.ENTITY_TYPE_STRING_TO_ENUM = {
    UNKNOWN: EntityType.Unknown,
    ADDRESS: EntityType.Address,
    TRANSACTION: EntityType.Transaction,
    BLOCK: EntityType.Block,
    URL: EntityType.Url,
};
var Label = (function () {
    function Label(entityType, entity, label, confidence, remove, metadata) {
        this.entityType = entityType;
        this.entity = entity;
        this.label = label;
        this.confidence = confidence;
        this.remove = remove;
        this.metadata = metadata;
    }
    Label.fromObject = function (_a) {
        var entityType = _a.entityType, entity = _a.entity, label = _a.label, confidence = _a.confidence, _b = _a.remove, remove = _b === void 0 ? false : _b, _c = _a.metadata, metadata = _c === void 0 ? [] : _c;
        if (typeof entityType == "string") {
            entityType = exports.ENTITY_TYPE_STRING_TO_ENUM[entityType];
        }
        return new Label(entityType, entity, label, confidence, remove, metadata);
    };
    return Label;
}());
exports.Label = Label;
