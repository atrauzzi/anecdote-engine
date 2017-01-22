#!/usr/bin/env node
import * as Commander from 'commander';
import * as _ from 'lodash';
import {Options} from "./Options";
import {Source} from './Engine/Source';
import {Target} from './Engine/Target';
import { Anecdote } from './Engine/Anecdote';


const manifest = require(__dirname + "/../package.json");

const defaultSources = [
    __dirname + "/Sources/Github",
    __dirname + "/Sources/Twitter",
];

const defaultTargets = [
    __dirname + "/Targets/AzureTables",
];

Commander
    .version(manifest.version)
    .option("-c, --sources <items>", "Source(s)", (val) => val.split(","), defaultSources)
    .option("-s, --targets <items>", "Target(s)", (val) => val.split(","), defaultTargets)
;

Commander.parse(process.argv);
//if (!Commander.args.length) Commander.help();

// http://stackoverflow.com/questions/41785511/can-i-add-members-to-an-existing-type-in-typescript
var options = new Options(Commander);

const engine = new Anecdote(
    options.createSources(), 
    options.createTargets()
);

engine.run();
