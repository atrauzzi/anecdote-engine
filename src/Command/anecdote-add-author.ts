#!/usr/bin/env node
import {Chance} from "chance";
import * as _ from "lodash";
import {build} from "./";
import {setting} from "./Coercers";
import {container} from "../Container";
import {Service} from "../Engine/Service";
import {Author} from "../Domain/Author";
import {Source as SourceModel} from "../Domain/Source";
import {Types} from "../Engine/index";
import {Configuration} from "../Engine/Configuration";
import {Configuration as MongoDbConfiguration} from "../Driver/MongoDb/Configuration";
import {Configuration as AmqpConfiguration} from "../Driver/Amqp/Configuration";
import {Repository} from "../Driver/MongoDb/Repository";
import {Source as GithubSource} from "../Driver/Github/Source";
import {Queue} from "../Driver/Amqp/Queue";
import {Target} from "../Driver/MongoDb/Target";


const defaultRepository = Repository;

const defaultSources = [
    GithubSource,
];

const defaultQueues = [
    Queue,
];

const defaultTargets = [
    Target,
];

interface AddAuthorConfiguration extends Configuration {

    firstName: string;

    lastName: string;

    authorSources: {[key: string]: SourceModel};
}

const command = build<AddAuthorConfiguration & MongoDbConfiguration & AmqpConfiguration>(
    defaultRepository,
    defaultSources,
    defaultQueues,
    defaultTargets
);

command
    .option("-F, --first-name <item>", "First name")
    .option("-L, --last-name <item>", "Last name")
    .option("-S, --author-sources <item>", "Source(s)", setting, {})
    .parse(process.argv)
;

const anecdote = container.get<Service>(Types.Anecdote);

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
    .catch((error) => console.log(error));
