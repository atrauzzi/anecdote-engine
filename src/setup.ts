#!/usr/bin/env node
import * as Commander from 'commander';
import {Options} from "./Options";
import {Anecdote} from './Engine/Anecdote';


const options = new Options(Commander);

const engine = new Anecdote(
    options.createDataSource(),
    options.createSources(),
    options.createTargets()
);

engine.setup();
