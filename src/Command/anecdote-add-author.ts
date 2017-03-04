#!/usr/bin/env node
import * as _ from "lodash";
import {Chance} from "chance";
import {build as buildCommand} from "./";
import {build as buildAnecdote} from "../";
import {setting} from "./Coercers";
import {Author} from "../Domain/Author";
import {Source as SourceModel} from "../Domain/Source";
import {Configuration} from "../Engine/Configuration";


interface AddAuthorConfiguration extends Configuration {

    firstName: string;

    lastName: string;

    authorSources: {[key: string]: SourceModel};
}

const command = buildCommand<AddAuthorConfiguration>();

command
    .option("-F, --first-name <item>", "First name")
    .option("-L, --last-name <item>", "Last name")
    .option("-S, --author-sources <item>", "Source(s)", setting, {})
    .parse(process.argv)
;

const anecdote = buildAnecdote(command);

const author = new Author;
author.id = Chance().guid();
author.firstName = command.firstName;
author.lastName = command.lastName;
author.sources = _.mapValues(command.authorSources, (sourceData) => {

    const source = new SourceModel;

    source.nativeId = sourceData.nativeId;
    source.username = sourceData.username;
    source.token = sourceData.token;

    return source;
});

anecdote
    .addAuthor(author)
    .then(() => anecdote.close())
    .catch((error) => console.log(error))
;
