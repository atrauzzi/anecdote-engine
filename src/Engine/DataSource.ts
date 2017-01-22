import {Driver} from "./Driver";
import {Author} from "../Domain/Author";


export interface DataSource extends Driver {

    addAuthor(): Promise<void>;

    loadAuthors(): Promise<Author[]>;

}