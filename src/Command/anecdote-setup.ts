#!/usr/bin/env node
import {Configuration} from "../Engine/Configuration";
import {build as buildCommand} from "./";
import {build as buildAnecdote} from "../";


const command = buildCommand<Configuration>();
command.parse(process.argv);

const anecdote = buildAnecdote(command);

anecdote.setup()
    .then(() => anecdote.close())
    .catch((error) => console.log(error))
;
