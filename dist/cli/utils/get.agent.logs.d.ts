import { AxiosStatic } from "axios";
export declare type GetAgentLogs = (agentId: string, minute?: Date) => Promise<ImmunxAgentLogResponse[]>;
export declare function provideGetAgentLogs(axios: AxiosStatic, immunxApiUrl: string): GetAgentLogs;
export interface ImmunxAgentLogResponse {
    scanner: string;
    timestamp: string;
    logs: string;
}
