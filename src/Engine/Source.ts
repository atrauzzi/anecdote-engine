import {Driver} from "./Driver";
import {ScanSource} from "./Job/ScanSource";


export interface Source extends Driver {

    scan(job: ScanSource): Promise<any>;
}