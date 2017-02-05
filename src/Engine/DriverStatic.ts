import {Driver} from "./Driver";


export interface DriverStatic<T extends Driver> {

    new(options: {[property: string]: any}): T;
}