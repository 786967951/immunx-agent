import shelljs from 'shelljs';
export declare type ListKeyfiles = () => string[];
export default function provideListKeyfiles(shell: typeof shelljs, immunxKeystore: string, configFilename: string): ListKeyfiles;
