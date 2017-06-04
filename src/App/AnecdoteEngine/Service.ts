import * as _ from "lodash";
import * as Redux from "redux";
import {Driver} from "./Contract/Driver";
import {Repository} from "./Contract/Repository";
import {Source} from "./Contract/Source";
import {Queue} from "./Contract/Queue";
import {Target} from "./Contract/Target";
import * as Domain from "./Domain/index";


export class Service {

    public get drivers(): Driver[] {

        return [].concat(
            [this.repository],
            this.sources,
            this.queues,
            this.targets,
        );
    }

    public get working() {

        return this.drivers.some((driver) => driver.working && driver.working());
    }

    public constructor(
        protected repository: Repository,
        protected sources: Source[],
        protected queues: Queue[],
        protected targets: Target[],
        protected bus: Redux.Store<any>
    ) {

        // ToDo: Switch to actions & reducers
        // this.bus.subscribe<ScanSource, void>("source", "scan", (envelope) => this.handleSourceScan(envelope));
        // this.bus.subscribe<PostFound, void>("post", "found", (envelope) => this.handleFoundPost(envelope));
    }

    public async setup() {

        await this.connect();

        await Promise.all(this.drivers.map((driver) => driver.setup()));
    }

    public async connect() {

        await Promise.all(this.drivers.map((driver) => driver.connect()))
    }

    public async close() {

        await Promise.all(this.drivers.map((driver) => driver.close()));
    }

    public work() {

        this.queues.forEach((queue) => queue.work());
    }

//
//
//

    public async addAuthor(author: Domain.Author) {

        await this.connect();

        await this.repository.addAuthor(author);
    }

    public async scanSources() {

        await this.connect();

        const authors = await this.repository.authors();

        const queueings = _.flattenDeep<Promise<void>>(
            authors.map((author) =>
                this.queues.map((queue) =>
                    queue.dispatchSourceScans(author))));

        await Promise.all(queueings);
    }

    // protected async handleSourceScan(envelope: Envelope<ScanSource>) {

    //     const job = envelope.data;
    //     const source = _.find(this.sources, (source) => source.name === job.sourceName);

    //     await source.scan(job);

    //     await this.repository.recordScan(job);
    // }

    // protected async handleFoundPost(envelope: Envelope<PostFound>) {

    //     const job = envelope.data;
    //     const post = job.post;

    //     await Promise.all(this.targets.map((target) => target.savePost(post)));
    // }
}
