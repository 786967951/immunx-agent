/// <reference types="node" />
import fs from "fs";
import shelljs from "shelljs";
export declare type InitKeystore = () => Promise<void>;
export default function provideInitKeystore(shell: typeof shelljs, filesystem: typeof fs, immunxKeystore: string): InitKeystore;
