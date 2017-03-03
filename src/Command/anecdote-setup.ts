#!/usr/bin/env node
import {ServiceProvider} from "../ServiceProvider";
import {container} from "../Container";
import {command} from "./Base";
import {Service} from "../Engine/Service";
import {Types} from "../Engine/index";


command.parse(process.argv);

const configurationReader = new ServiceProvider(container, command);
configurationReader.bindAll();

const anecdote = container.get<Service>(Types.Anecdote);

anecdote.setup()
    .then(() => anecdote.close())
    .catch((error) => console.log(error));
