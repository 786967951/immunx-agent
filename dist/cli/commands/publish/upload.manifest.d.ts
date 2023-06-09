/// <reference types="node" />
import fs from "fs";
import { AddToIpfs } from "../../utils/add.to.ipfs";
export declare type UploadManifest = (imageReference: string, privateKey: string) => Promise<string>;
export declare type ChainSetting = {
    shards: number;
    target: number;
};
export declare type ChainSettings = {
    [id: string]: ChainSetting;
};
export default function provideUploadManifest(filesystem: typeof fs, addToIpfs: AddToIpfs, agentName: string, description: string, agentId: string, version: string, documentation: string, repository: string, cliVersion: string, chainIds: number[], chainSettings: ChainSettings): UploadManifest;
