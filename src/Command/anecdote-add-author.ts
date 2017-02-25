#!/usr/bin/env node
import {Chance} from "chance";
import * as _ from "lodash";
import {ServiceProvider} from "../ServiceProvider";
import {container} from "../Container";
import {command, setting} from "./Base";
import {Anecdote} from "../Engine/Anecdote";
import {Author} from "../Domain/Author";
import {Source} from "../Domain/Source";
import {Types} from "../Engine/index";


command
    .option("-F, --first-name <item>", "First name")
    .option("-L, --last-name <item>", "Last name")
    .option("-S, --author-sources <item>", "Source(s)", setting, {})
;

command.parse(process.argv);

const configurationReader = new ServiceProvider(container, command);
configurationReader.bindAll();

const anecdote = container.get<Anecdote>(Types.Anecdote);

const author = new Author;
author.id = Chance().guid();
author.firstName = command["firstName"];
author.lastName = command["lastName"];
author.sources = _.mapValues(command["authorSources"], (sourceData) => {

    const source = new Source;

    source.nativeId = sourceData.nativeId;
    source.username = sourceData.username;
    source.token = sourceData.token;

    return source;
});

anecdote
    .addAuthor(author)
    .then(() => anecdote.close())
    .catch((error) => console.log(error));
