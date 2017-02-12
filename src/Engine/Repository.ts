import {Driver} from "./Driver";
import {Author} from "../Domain/Author";


export interface Repository extends Driver {

    addAuthor(author: Author): Promise<void>;

    // ToDo: When generators are fully landed in TS, switch!
    authors(): Promise<Author[]>;
}