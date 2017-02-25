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

anecdote.scanSources()
    .then(() => anecdote.close())
    .catch((error) => console.error(error));


