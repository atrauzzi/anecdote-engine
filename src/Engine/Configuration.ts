import {Target} from "./Target";
import {Queue} from "./Queue";
import {Source} from "./Source";
import {Repository} from "./Repository";
import {DriverStatic} from "./DriverStatic";


export interface Configuration {

    repository: DriverStatic<Repository> | string;

    sources: DriverStatic<Source>[] | string[];

    queues: DriverStatic<Queue>[] | string[];

    targets: DriverStatic<Target>[] | string[];
}