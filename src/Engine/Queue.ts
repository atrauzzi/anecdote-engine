import {Driver} from "./Driver";
import {Author} from "../Domain/Author";
import {Anecdote} from "./Anecdote";


export interface Queue extends Driver {

    dispatchScanSources(author: Author): Promise<void>;

    // ToDo: Rather than call anecdote directly, we should use a bus.
    work(anecdote: Anecdote): Promise<void>;
}