import {Queue as QueueContract} from "../../Engine/Queue";
import {Configuration} from "../../Engine/Configuration";
import {Author} from "../../Domain/Author";
import * as amqp from "amqplib";


export class Queue implements QueueContract {

    public name = "amqp";

    protected connectionString: string;

    protected connection: amqp.Connection;

    protected channel: amqp.Channel;

    public constructor (options?: Configuration) {

        this.connectionString = options.values["AMQP_CONNECTION_STRING"];
    }

    protected async connect() {

        if(!this.connection) {

            this.connection = await amqp.connect(this.connectionString);

            const channel = await this.connection.createChannel();
            await channel.assertQueue("scan");

            this.channel = channel;
        }
    }

    public async close() {

        await this.channel.close();
        this.channel = null;
        await this.connection.close();
        this.connection = null;
    }

    public async dispatchScan(author: Author) {

        await this.connect();

        this.channel.sendToQueue("scan", new Buffer(JSON.stringify(author)));
    }

    public handleScans(): Promise<void> {

        return undefined;
    }

    public async setup(): Promise<void> {

        await this.connect();
        console.log("Successfully connected to AMQP server!");
    }
}