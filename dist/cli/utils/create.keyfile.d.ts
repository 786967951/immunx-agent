import shelljs from 'shelljs';
export declare type CreateKeyfile = (password: string) => Promise<{
    publicKey: string;
    privateKey: string;
}>;
export declare function provideCreateKeyfile(shell: typeof shelljs, immunxKeystore: string): CreateKeyfile;
