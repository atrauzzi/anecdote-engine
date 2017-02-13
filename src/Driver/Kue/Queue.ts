import {Queue as QueueContract} from "../../Engine/Queue";
import {Configuration} from "../../Engine/Configuration";
import {Author} from "../../Domain/Author";
import * as kue from "kue";


// ToDo: https://github.com/Automattic/kue/issues/787
export class Queue implements QueueContract {

    public name = "kue";

    protected host: string;

    protected port: number;

    protected queue: kue.Queue;

    constructor (options?: Configuration) {

        this.host = options.values["REDIS_HOST"];
        this.port = parseInt(options.values["REDIS_PORT"]);
    }

    protected connect() {

        if(!this.queue) {

            this.queue = kue.createQueue({
                prefix: "anecdote:kue",
                redis: {
                    host: this.host,
                    port: this.port,
                },
            });
        }

        // ToDo: Create some kind of shutdown lifecycle in the driver contract. Call from engine.
        process.on("exit", () => this.close());
    }

    protected close() {

        this.queue = null;
    }

    public async dispatchScan(author: Author): Promise<void> {

        this.connect();

        await new Promise<void>((resolve, reject) => {

            // ToDo: For some reason this isn't queueing anything.
            this.queue
                .create("scan", author)
                .save();

            resolve();
        });
    }

    handleScans(): Promise<void> {

        return undefined;
    }

    setup(): Promise<void> {

        return undefined;
    }
}