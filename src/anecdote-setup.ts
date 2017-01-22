#!/usr/bin/env node
import Commander from "./Command";
import {Options} from "./Options";
import {Anecdote} from './Engine/Anecdote';


Commander.parse(process.argv);
const options = new Options(Commander);

const engine = new Anecdote(
    options.createDataSource(),
    options.createSources(),
    options.createTargets()
);

engine.setup();
