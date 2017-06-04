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

const author = <Author> {
    id: Chance().guid(),
    firstName: command.firstName,
    lastName: command.lastName,
    sources: _.mapValues(command.authorSources, (sourceData) => <SourceModel> {
        nativeId: sourceData.nativeId,
        username: sourceData.username,
        token: sourceData.token,
    })
};

anecdote
    .addAuthor(author)
    .then(() => anecdote.close())
    .catch((error) => console.log(error))
;
