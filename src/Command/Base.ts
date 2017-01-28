import * as commander from "commander";
import * as dotenv from "dotenv";
import * as _ from "lodash";


const environment = (dotenv.config() as any).parsed;

const manifest = require(__dirname + "/../../package.json");

const defaultRepository = __dirname + "/../Driver/AzureStorage/Repository";

const defaultSources = [
    __dirname + "/../Driver/Github/Source",
    __dirname + "/../Driver/Twitter/Source",
];

const defaultQueues = [
    __dirname + "/../Driver/AzureStorage/Queue",
];

const defaultTargets = [
    __dirname + "/../Driver/AzureStorage/Target",
];

export function collect(valuePair: string, memo: {[key: string]: string}) {

    const pair = valuePair.split("=");
    const key = pair[0];

    memo[key] = pair[1];

    return memo;
}

export function setting(pathAndValue: string, settings: any) {

    const pathValuePair = pathAndValue.split("=");

    _.set(settings, pathValuePair[0], pathValuePair[1]);

    return settings;
}

export const split = (value: string) => value.split(",");

commander
    .version(manifest.version)
    .option("-r, --repository <item>", "Repository", defaultRepository)
    .option("-c, --sources <items>", "Source(s)", split, defaultSources)
    .option("-q, --queues <items>", "Queue(s)", split, defaultQueues)
    .option("-s, --targets <items>", "Target(s)", split, defaultTargets)
    .option("-e, --config <item>", "Configuration value", collect, environment)
;

export {commander as command};