#!/usr/bin/env node
import {Configuration} from "../Engine/Configuration";
import {build as buildCommand} from "./";
import {build as buildAnecdote} from "../";


const interval = 5 * 1000;

const command = buildCommand<Configuration>();
command.parse(process.argv);

const anecdote = buildAnecdote(command);

const heartBeat = setInterval(
    () => {

        console.log("Beat...");

        if(!anecdote.working()) {

            console.log("...Heart beat.");
            clearInterval(heartBeat);
            anecdote.close();
        }
    },
    interval
);

anecdote.work();
