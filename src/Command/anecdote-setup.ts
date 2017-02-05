#!/usr/bin/env node
import {command} from "./Base";
import {ConfigurationReader} from "../Engine/ConfigurationReader";
import {Anecdote} from "../Engine/Anecdote";


command.parse(process.argv);

const options = new ConfigurationReader(command);

const engine = new Anecdote(
    options.bindRepository(),
    options.bindQueues(),
    options.bindSources(),
    options.bindTargets(),
    options.config
);

engine.setup();
