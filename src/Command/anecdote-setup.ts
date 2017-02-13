#!/usr/bin/env node
import {ConfigurationReader} from "../Engine/ConfigurationReader";
import {container} from "../Container";
import {command} from "./Base";
import {Anecdote} from "../Engine/Anecdote";
import {Types} from "../Engine/index";


command.parse(process.argv);

const configurationReader = new ConfigurationReader(container, command);
configurationReader.bindAll();

const anecdote = container.get<Anecdote>(Types.Anecdote);

anecdote.setup()
    .catch((error) => console.log(error))
    .then(() => anecdote.close());
