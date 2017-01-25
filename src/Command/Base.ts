import * as commander from 'commander';


const manifest = require(__dirname + "/../../package.json");

const defaultRepository = __dirname + "/../Drivers/AzureTables/Repository";

const defaultSources = [
    __dirname + "/../Drivers/Github/Source",
    __dirname + "/../Drivers/Twitter/Source",
];

const defaultTargets = [
    __dirname + "/../Drivers/AzureTables/Target",
];

commander
    .version(manifest.version)
    .option("-r, --repository <item>", "Repository", defaultRepository)
    .option("-c, --sources <items>", "Source(s)", (val) => val.split(","), defaultSources)
    .option("-s, --targets <items>", "Target(s)", (val) => val.split(","), defaultTargets)
;

export default commander;