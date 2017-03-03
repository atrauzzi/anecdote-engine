#!/usr/bin/env node
import {command} from "./Base";
import {ServiceProvider} from "../ServiceProvider";
import {container} from "../Container";
import {Types} from "../Engine/index";
import {Service} from "../Engine/Service";


command.parse(process.argv);

const configurationReader = new ServiceProvider(container, command);
configurationReader.bindAll();

const anecdote = container.get<Service>(Types.Anecdote);

anecdote.scanSources()
    .then(() => anecdote.close())
    .catch((error) => console.error(error));


