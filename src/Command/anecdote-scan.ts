#!/usr/bin/env node
import {command} from "./Base";
import {Options} from "../Engine/Options";
import {Anecdote} from "../Engine/Anecdote";


command.parse(process.argv);

const options = new Options(command);

const engine = new Anecdote(
    options.createRepository(),
    options.createSources(),
    options.createQueues(),
    options.createTargets(),
    options.config
);

engine
    .scan()
    .catch((error) => {
        throw error;
    });
