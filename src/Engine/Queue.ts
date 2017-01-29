import {Driver} from "./Driver";
import {Author} from "../Domain/Author";


export interface Queue extends Driver {

    dispatchScan(author: Author): Promise<void>;

    handleScan(): Promise<void>;
}