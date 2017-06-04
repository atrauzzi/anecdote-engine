import {Driver} from "./Driver";
import {Author} from "../Domain/Author";
import {ScanSource} from "./Job/ScanSource";


export interface Repository extends Driver {

    addAuthor(author: Author): Promise<any>;

    authors(): Promise<Author[]>;

    recordScan(job: ScanSource): void;
}