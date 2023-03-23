/// <reference types="node" />
import fs from 'fs';
import { ImmunxConfig } from "../../sdk";
import { GetJsonFile } from ".";
export declare type GetImmunxConfig = () => ImmunxConfig;
export default function provideGetImmunxConfig(filesystem: typeof fs, isProduction: boolean, configFilename: string, localConfigFilename: string, immunxKeystore: string, getJsonFile: GetJsonFile, contextPath: string): GetImmunxConfig;
