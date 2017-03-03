import {Target} from "./Target";
import {Queue} from "./Queue";
import {Source} from "./Source";
import {Repository} from "./Repository";


export interface Configuration {


    repository: Repository;

    sources: Source[];

    queues: Queue[];

    targets: Target[];

    values: any;
}