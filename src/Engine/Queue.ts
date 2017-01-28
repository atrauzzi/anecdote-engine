import {Driver} from "./Driver";
import {Source} from "../Domain/Source";


export interface Queue extends Driver {

    dispatchScan(source: Source): Promise<void>;

    handleScan(): Promise<void>;
}