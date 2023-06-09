/// <reference types="node" />
import fs from "fs";
import shelljs from "shelljs";
export declare type InitConfig = () => Promise<void>;
export default function provideInitConfig(shell: typeof shelljs, filesystem: typeof fs, immunxKeystore: string, configFilename: string, contextPath: string): () => Promise<void>;
