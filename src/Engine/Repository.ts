import {Driver} from "./Driver";
import {Author} from "../Domain/Author";
import {ScanSource} from "./Job/ScanSource";


export interface Repository extends Driver {

    addAuthor(author: Author): Promise<any>;

    // ToDo: When generators are fully landed in TS, switch!
    authors(): Promise<Author[]>;

    recordScan(job: ScanSource): void;
}