#!/usr/bin/env node
import * as wtfnode from "wtfnode";
import {Configuration} from "../Engine/Configuration";
import {build as buildCommand} from "./";
import {build as buildAnecdote} from "../";


const command = buildCommand<Configuration>();
command.parse(process.argv);

const anecdote = buildAnecdote(command);

anecdote.scanSources()
    .then(() => anecdote.close())
    .catch((error) => console.error(error))
;


