#!/usr/bin/env node
import {command, setting} from "./Base";
import * as _ from "lodash";
import {Options} from "../Engine/Options";
import {Anecdote} from '../Engine/Anecdote';
import {Author} from "../Domain/Author";
import {Source} from "../Domain/Source";


command
    .option("-F, --first-name <item>", "First name")
    .option("-L, --last-name <item>", "Last name")
    .option("-S, --author-sources <item>", "Source(s)", setting, {})
;

command.parse(process.argv);

const options = new Options(command);

const engine = new Anecdote(
    options.createRepository(),
    options.createSources(),
    options.createQueues(),
    options.createTargets(),
    options.config
);

const author = new Author;
author.firstName = command["firstName"];
author.lastName = command["lastName"];
author.sources = _.mapValues(command["authorSources"], (sourceData) => {

    const source = new Source;
    source.nativeId = sourceData.nativeId;
    source.token = sourceData.token;

    return source;
});

engine.addAuthor(author);
