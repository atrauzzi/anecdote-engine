import * as _ from "lodash";
import * as commander from "commander";
import {manifest, environment} from "../App";
import {ICommand} from "commander";
import {split, collect} from "./Coercers";
import {Repository} from "../Engine/Repository";
import {Queue} from "../Engine/Queue";
import {Source} from "../Engine/Source";
import {Target} from "../Engine/Target";
import {DriverStatic} from "../Engine/DriverStatic";


export function build<Configuration>(
    defaultRepository: DriverStatic<Repository>,
    defaultSources: DriverStatic<Source>[],
    defaultQueues: DriverStatic<Queue>[],
    defaultTargets: DriverStatic<Target>[]
) {

    const command = commander
        .version(manifest.version)
        .option("-r, --repository <item>", "Repository", _.identity, defaultRepository)
        .option("-c, --sources <items>", "Source(s)", split, defaultSources)
        .option("-q, --queues <items>", "Queue(s)", split, defaultQueues)
        .option("-s, --targets <items>", "Target(s)", split, defaultTargets)
        .option("-e, --config <item>", "Configuration value", collect, environment)
    ;

    return command as ICommand & Configuration;
}
