import {Driver} from "./Driver";
import {Service as Bus} from "../Bus/Service";
import {Configuration} from "./Configuration";


export interface DriverStatic<T extends Driver> {

    new(configuration: Configuration, bus: Bus, ...dependencies: any[]): T;
}