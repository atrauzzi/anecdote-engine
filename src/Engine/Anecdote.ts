import * as _ from "lodash";
import {Repository} from "./Repository";
import {Source} from "./Source";
import {Queue} from "./Queue";
import {Target} from "./Target";
import * as Domain from "../Domain/index";
import {Driver} from "./Driver";
import {Service as Bus} from "../Bus/Service";
import {Envelope} from "../Bus/Envelope";
import {ScanSource} from "./Job/ScanSource";
import {PostFound} from "./Job/PostFound";


export class Anecdote {

    public get drivers() {

        return _.concat<Driver>(
            [this.repository],
            this.sources,
            this.queues,
            this.targets,
        );
    }

    public constructor(
        protected repository: Repository,
        protected sources: Source[],
        protected queues: Queue[],
        protected targets: Target[],
        protected bus: Bus
    ) {

        console.log("Using repository:", this.repository.name);
        console.log("Using post sources:", this.sources.map((source) => source.name));
        console.log("Using queues:", this.queues.map((queue) => queue.name));
        console.log("Using post targets:", this.targets.map((target) => target.name));

        console.log("Registring job handlers.");
        // ToDo: Probably could do a dynamic dispatch, by-convention.
        this.bus.subscribe<ScanSource, void>("source", "scan", (envelope) => this.handleSourceScan(envelope));
        this.bus.subscribe<PostFound, void>("post", "found", (envelope) => this.handleFoundPost(envelope));
    }

    public async setup() {

        await Promise.all(this.drivers.map((driver) => driver.setup()));
    }

    public async close() {

        await Promise.all(this.drivers.map((driver) => driver.close()));
    }

    public async addAuthor(author: Domain.Author) {

        await this.repository.addAuthor(author);
    }

    public async scanSources() {

        const authors = await this.repository.authors();

        const queueings = _.flattenDeep<Promise<void>>(
            authors.map((author) =>
                this.queues.map((queue) =>
                    queue.dispatchSourceScans(author))));

        await Promise.all(queueings);
    }

    public work() {

        this.queues.forEach((queue) => queue.work());
    }

    public working() {

        return this.drivers.some((driver) => driver.working && driver.working());
    }

    public async handleSourceScan(envelope: Envelope<ScanSource>) {

        const job = envelope.data;
        const source = _.find(this.sources, (source) => source.name === job.sourceName);

        await source.scan(job);

        await this.repository.recordScan(job);
    }

    public async handleFoundPost(envelope: Envelope<PostFound>) {

        const job = envelope.data;
        const post = job.post;

        await Promise.all(this.targets.map((target) => target.savePost(post)));
    }
}
