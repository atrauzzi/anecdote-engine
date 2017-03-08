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
    // .then(() => {
    //
    //     setInterval(wtfnode.dump, 5000);
    // })
    .catch((error) => console.error(error))
;


