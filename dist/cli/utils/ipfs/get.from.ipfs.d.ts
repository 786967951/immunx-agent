import { AxiosInstance } from "axios";
export declare type GetFromIpfs = (metadataHash: string) => Promise<IpfsData>;
export interface IpfsData {
    manifest: IpfsManifestData;
}
export interface IpfsManifestData {
    name: string;
    from: string;
    agentId: string;
    version: string;
    imageReference: string;
    agentIdHash: string;
    timestamp: string;
    repository: string;
    publishedFrom: string;
    documentation: string;
}
export default function provideGetFromIpfs(immunxIpfsHttpClient: AxiosInstance, agentId: string): GetFromIpfs;
