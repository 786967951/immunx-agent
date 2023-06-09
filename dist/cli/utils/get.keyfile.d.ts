/// <reference types="node" />
import fs from 'fs';
import { ListKeyfiles } from './list.keyfiles';
export declare type GetKeyfile = () => {
    path: string;
    name: string;
};
export default function provideGetKeyfile(listKeyfiles: ListKeyfiles, filesystem: typeof fs, immunxKeystore: string, keyfileName?: string): GetKeyfile;
