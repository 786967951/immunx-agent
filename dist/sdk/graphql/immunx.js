"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryFromAlertOptions = exports.IMMUNX_GRAPHQL_URL = void 0;
exports.IMMUNX_GRAPHQL_URL = "https://api.immunx.network/graphql";
var getQueryFromAlertOptions = function (options) {
    return {
        "operationName": "fetchAlerts",
        "query": "\n            query fetchAlerts(\n                $sensors: [String], \n                $addresses: [String], \n                $after: AlertEndCursorInput,\n                $alertHash: String, \n                $alertName: String, \n                $alertId: String, \n                $alertIds: [String], \n                $chainId: NonNegativeInt,\n                $first: NonNegativeInt,\n                $projectId: String,\n                $scanNodeConfirmations: scanNodeFilters,\n                $severities: [String],\n                $transactionHash: String,\n                $blockSortDirection: Sort,\n                $createdSince: NonNegativeInt,\n                $createdBefore: NonNegativeInt,\n                $blockDateRange: DateRange,\n                $blockNumberRange: BlockRange\n                ) {\n                    alerts(input:{\n                        sensors: $sensors,\n                        addresses: $addresses,\n                        after: $after,\n                        alertHash: $alertHash,\n                        alertName: $alertName,\n                        alertId: $alertId,\n                        alertIds: $alertIds,\n                        chainId: $chainId,\n                        projectId: $projectId,\n                        scanNodeConfirmations: $scanNodeConfirmations,\n                        severities: $severities,\n                        transactionHash: $transactionHash,\n                        blockSortDirection: $blockSortDirection,\n                        first: $first,\n                        createdSince: $createdSince,\n                        createdBefore: $createdBefore,\n                        blockDateRange: $blockDateRange,\n                        blockNumberRange: $blockNumberRange\n                    }) {\n                        alerts {\n                            alertId\n                            addresses\n                            contracts {\n                                address\n                                name\n                                projectId\n                            }\n                            createdAt\n                            description\n                            hash\n                            metadata\n                            name\n                            projects {\n                                id\n                            }\n                            protocol\n                            scanNodeCount\n                            severity\n                            source {\n                                transactionHash\n                                sensor {\n                                    chainIds\n                                    createdAt\n                                    description\n                                    developer\n                                    docReference\n                                    enabled\n                                    id\n                                    image\n                                    name\n                                    reference\n                                    repository\n                                    projects\n                                    scanNodes\n                                    version\n                                }\n                                block {\n                                    number\n                                    hash\n                                    timestamp\n                                    chainId\n                                }\n                                sourceAlert {\n                                    hash\n                                    sensorId\n                                    timestamp\n                                    chainId\n                                }\n                            }\n                            alertDocumentType\n                            findingType\n                            relatedAlerts\n                            chainId\n                            labels {\n                                label\n                                confidence\n                                entity\n                                entityType\n                                remove\n                                metadata\n                            }\n                            addressBloomFilter {\n                                bitset\n                                k\n                                m\n                            }\n                        }\n                        pageInfo {\n                            hasNextPage\n                            endCursor {\n                                alertId\n                                blockNumber\n                            }\n                        }\n                    }\n            }\n        ",
        "variables": {
            sensors: options.sensorIds,
            addresses: options.addresses,
            after: options.startingCursor,
            alertId: options.alertId,
            chainId: options.chainId,
            first: options.first,
            projectId: options.projectId,
            scanNodeConfirmations: options.scanNodeConfirmations,
            severities: options.severities,
            transactionHash: options.transactionHash,
            blockSortDirection: options.blockSortDirection,
            createdSince: options.createdSince,
            createdBefore: options.createdBefore,
            blockDateRange: options.blockDateRange ?
                { startDate: options.blockDateRange.startDate.toISOString().split('T')[0], endDate: options.blockDateRange.endDate.toISOString().split('T')[0] } :
                undefined,
            blockNumberRange: options.blockNumberRange,
            alertIds: options.alertIds,
            alertHash: options.alertHash,
            alertName: options.alertName
        }
    };
};
exports.getQueryFromAlertOptions = getQueryFromAlertOptions;
