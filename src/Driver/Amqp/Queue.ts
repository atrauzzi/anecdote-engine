import * as _ from "lodash";
import {Queue as QueueContract} from "../../Engine/Queue";
import {Configuration} from "../../Engine/Configuration";
import {Author} from "../../Domain/Author";
import * as amqp from "amqplib";
import {Anecdote} from "../../Engine/Anecdote";


export class Queue implements QueueContract {

    public name = "amqp";

    protected connectionString: string;

    protected connection: amqp.Connection;

    protected channel: amqp.Channel;

    protected bus: IPostal;

    public constructor(options: Configuration, bus: IPostal) {

        this.connectionString = options.values["AMQP_CONNECTION_STRING"];
        this.bus = bus;
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

        if(this.connection) {

            await this.channel.close();
            this.channel = null;
            await this.connection.close();
            this.connection = null;
        }
    }

    public async dispatchScanSources(author: Author) {

        await this.connect();

        _.forEach(author.sources, (source) =>
            this.channel.sendToQueue("scan", new Buffer(JSON.stringify({} as ScanSource))));
    }

    public async work(anecdote: Anecdote) {

        await this.connect();

        await this.channel.consume("scan", (message) => this.handleAuthor(message));
    }

    protected async handleAuthor(message: amqp.Message) {



        this.bus.publish({
            channel: "author",
            topic: "found",
            data: message.content.toString()
        });

        await this.channel.ack(message);
    }

    public async setup(): Promise<void> {

        await this.connect();
        console.log("Successfully connected to AMQP server!");
    }
}