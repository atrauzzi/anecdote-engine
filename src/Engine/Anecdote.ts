import * as _ from "lodash";
import {Repository} from "./Repository";
import {Source} from "./Source";
import {Queue} from "./Queue";
import {Target} from "./Target";
import * as Domain from "../Domain/index";


export class Anecdote {

    public constructor(
        protected repository: Repository,
        protected sources: Source[],
        protected queues: Queue[],
        protected targets: Target[]
    ) {

        console.log("Using repository:", this.repository.name);
        console.log("Using post sources:", this.sources.map((source) => source.name));
        console.log("Using queues:", this.queues.map((queue) => queue.name));
        console.log("Using post targets:", this.targets.map((target) => target.name));
    }

    public async setup(): Promise<void> {

        const drivers = _.concat(
            [this.repository],
            this.sources,
            this.queues,
            this.targets,
        );

        await Promise.all(drivers.map((driver) => driver.setup()));
    }

    public async addAuthor(author: Domain.Author) {

        await this.repository.addAuthor(author);
    }

    public async scan() {

        const authors = await this.repository.authors();

        // ToDo: I'd love to know if there's a way to sugar this up!
        // Note: "No" from lodash :(  - https://github.com/lodash/lodash/issues/1191
        await Promise.all(
            authors.map((author) =>
                this.queues.map((queue) =>
                    queue.dispatchScan(author))));
    }

    public async findSource(name: string) {

        return _.find(this.sources, (source: Source) => source.name === name);
    }
}