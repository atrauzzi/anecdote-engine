import {Driver} from "./Driver";


export interface DriverStatic<T extends Driver> {

    new(bus: IPostal, options: {[property: string]: any}): T;
}