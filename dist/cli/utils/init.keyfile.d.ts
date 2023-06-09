import prompts from "prompts";
import { CreateKeyfile } from "./create.keyfile";
import { ListKeyfiles } from "./list.keyfiles";
export declare type InitKeyfile = () => Promise<void>;
export default function provideInitKeyfile(prompt: typeof prompts, immunxKeystore: string, listKeyfiles: ListKeyfiles, createKeyfile: CreateKeyfile): () => Promise<void>;
