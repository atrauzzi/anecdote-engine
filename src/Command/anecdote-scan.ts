#!/usr/bin/env node
import {command} from "./Base";
import {ConfigurationReader} from "../Engine/ConfigurationReader";
import {container} from "../Container";
import {Types} from "../Engine/index";
import {Anecdote} from "../Engine/Anecdote";


command.parse(process.argv);

const configurationReader = new ConfigurationReader(container, command);
configurationReader.bindAll();

const anecdote = container.get<Anecdote>(Types.Anecdote);

anecdote.scan()
    .catch((error) => console.error(error))
    .then(() => anecdote.close());

