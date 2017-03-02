import {Driver} from "./Driver";
import {Service as Bus} from "../Bus/Service";

export interface DriverStatic<T extends Driver> {

    new(bus: Bus, options: {[property: string]: any}): T;
}