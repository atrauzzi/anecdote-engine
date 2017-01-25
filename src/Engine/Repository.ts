import {Driver} from "./Driver";
import {Author} from "../Domain/Author";


export interface Repository extends Driver {

    addAuthor(author: Author): Promise<void>;

    loadAuthors(): Promise<Author[]>;
}