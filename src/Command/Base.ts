import * as commander from "commander";
import * as _ from "lodash";
import {manifest, environment} from "../App";
import {Repository} from "../Driver/MongoDb/Repository";
import {Source as GithubSource} from "../Driver/Github/Source";
import {Source as TwitterSource} from "../Driver/Twitter/Source";
import {Queue} from "../Driver/MongoDb/Queue";
import {Target} from "../Driver/MongoDb/Target";


const defaultRepository = Repository;

const defaultSources = [
    GithubSource,
    TwitterSource,
];

const defaultQueues = [
    Queue,
];

const defaultTargets = [
    Target,
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
