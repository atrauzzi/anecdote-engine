import * as Commander from 'commander';

const manifest = require(__dirname + "/../package.json");

const defaultDataSource = __dirname + "/Engine/Drivers/DataSources/AzureTables";

const defaultSources = [
    __dirname + "/Engine/Drivers/Sources/Github",
    __dirname + "/Engine/Drivers/Sources/Twitter",
];

const defaultTargets = [
    __dirname + "/Engine/Drivers/Targets/AzureTables",
];

Commander
    .version(manifest.version)
    .option("-a, --data <item>", "Author source", defaultDataSource)
    .option("-c, --sources <items>", "Source(s)", (val) => val.split(","), defaultSources)
    .option("-s, --targets <items>", "Target(s)", (val) => val.split(","), defaultTargets)
;

export default Commander;