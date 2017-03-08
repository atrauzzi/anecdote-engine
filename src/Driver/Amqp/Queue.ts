import * as _ from "lodash";
import protobuf from "../../Protobuf";
import {Queue as QueueContract} from "../../Engine/Queue";
import {Configuration} from "./Configuration";
import {Service as Bus} from "../../Bus/Service";
import {Author} from "../../Domain/Author";
import * as amqp from "amqplib";
import {ScanSource} from "../../Engine/Job/ScanSource";


export class Queue implements QueueContract {

    public name = "amqp";

    protected connectionString: string;

    protected connection: amqp.Connection;

    protected channel: amqp.ConfirmChannel;

    protected bus: Bus;

    protected active = 0;

    public constructor(options: Configuration, bus: Bus) {

        this.connectionString = options.AMQP_CONNECTION_STRING;
        this.bus = bus;
    }

    public async connect() {

        if(!this.connection) {

            this.connection = await amqp.connect(this.connectionString);

            const channel = await this.connection.createConfirmChannel();
            await channel.assertQueue("scan:sources");

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

    public async dispatchSourceScans(author: Author) {

        _.forEach(author.sources, (source, name) =>
            this.channel.sendToQueue("scan:sources", this.toJsonBuffer(<ScanSource>{
                authorId: author.id,
                sourceName: name,
                data: this.encodeJson("Source", source)
            }))
        );
    }

    public working() {

        return !!this.active;
    }

    public async work() {

        this.workSources();
    }

    public workSources() {

        this.channel.consume("scan:sources", (message) => this.handleSource(message));
    }

    protected async handleSource(message: amqp.Message) {

        ++this.active;

        const job = JSON.parse(message.content.toString());

        try {

            await this.bus.dispatch("source", "scan", job);

            console.log("Handled job: ", job);
            console.log("");
        }
        catch(ex) {

            this.channel.reject(message, false);

            console.warn("Error handling job: ", job);
            console.warn("Reason: ", ex);
            console.warn("");
        }

        --this.active;
        await this.channel.ack(message);
    }

    public async setup(): Promise<void> {

        console.log("Successfully connected to AMQP server!");
    }

    protected toJsonBuffer(data: any) {

        return new Buffer(JSON.stringify(data));
    }

    protected encodeJson(typeName: string, data: any): any {

        const type = protobuf.lookupType(typeName);

        return type.toObject(data);
    }
}