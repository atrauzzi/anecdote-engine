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
        protected targets: Target[],
        public config: {[key: string]: string}
    ) {
        console.log("Using data source:", this.repository.name);
        console.log("Using post sources:", this.sources.map((source) => source.name));
        console.log("Using queues:", this.queues.map((queue) => queue.name));
        console.log("Using post targets:", this.targets.map((target) => target.name));
        console.log("Using config:", this.config);
    }

    public async setup(): Promise<void> {

        await this.repository.setup();
        await this.sources.forEach((source) => source.setup());
        await this.queues.forEach((queue) => queue.setup());
        await this.targets.forEach((target) => target.setup());
    }

    public async addAuthor(author: Domain.Author) {

        await this.repository.addAuthor(author);
    }

    public async scan() {

        const authors = await this.repository.loadAuthors();

        authors.forEach((author) => {

            this.queues.forEach((queue) => {

                queue.dispatchScan(author);
            });
        });
    }

    public async findSource(name: string) {

        return _.find(this.sources, (source: Source) => source.name === name);
    }
}