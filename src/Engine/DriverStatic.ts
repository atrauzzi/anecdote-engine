import {Driver} from "./Driver";


export interface DriverStatic {

    new(options: {[property: string]: any}): Driver;
}