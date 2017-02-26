#!/usr/bin/env node
import {command} from "./Base";
import {ServiceProvider} from "../ServiceProvider";
import {container} from "../Container";
import {Types} from "../Engine/index";
import {Anecdote} from "../Engine/Anecdote";


command.parse(process.argv);

const configurationReader = new ServiceProvider(container, command);
configurationReader.bindAll();

const anecdote = container.get<Anecdote>(Types.Anecdote);
const interval = 5 * 1000;


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
