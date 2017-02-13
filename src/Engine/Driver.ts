import {DriverStatic} from "./DriverStatic";


export interface Driver {

    name: string;

    setup(): Promise<void>;

    close(): Promise<void>;
}