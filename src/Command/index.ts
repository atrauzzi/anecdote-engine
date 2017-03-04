import * as _ from "lodash";
import * as commander from "commander";
import {manifest, environment} from "../App";
import {ICommand} from "commander";
import {split, collect} from "./Coercers";


export function build<Configuration>() {

    const command = commander
        .version(manifest.version)
        .option("-r, --repository <item>", "Repository", _.identity, null)
        .option("-c, --sources <items>", "Source(s)", split, [])
        .option("-q, --queues <items>", "Queue(s)", split, [])
        .option("-s, --targets <items>", "Target(s)", split, [])
        .option("-e, --config <item>", "Configuration value", collect, environment)
    ;

    return command as ICommand & Configuration;
}
