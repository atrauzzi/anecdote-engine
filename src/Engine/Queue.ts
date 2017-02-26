import {Driver} from "./Driver";
import {Author} from "../Domain/Author";


export interface Queue extends Driver {

    dispatchSourceScans(author: Author): Promise<any>;

    // Handle all types of processing, either asynchronously or sequentially, once.
    work(): void;

    workSources(): void;
}