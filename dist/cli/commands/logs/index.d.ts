import { CommandHandler } from "../..";
import { ImmunxAgentLogResponse, GetAgentLogs } from '../../utils/get.agent.logs';
export default function provideLogs(agentId: string, getAgentLogs: GetAgentLogs, args: any): CommandHandler;
export declare const printLogToConsole: (log: ImmunxAgentLogResponse) => void;
export declare const getNextMinute: (curMinute: Date, latestDateTime: Date) => Date | undefined;
