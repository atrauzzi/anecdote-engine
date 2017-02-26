import * as _ from "lodash";
import * as process from "process";
import protobuf from "../../Protobuf";
import {Queue as QueueContract} from "../../Engine/Queue";
import {Configuration} from "../../Engine/Configuration";
import {Service as Bus} from "../../Bus/Service";
import {Author} from "../../Domain/Author";
import * as amqp from "amqplib";
import {ScanSource} from "../../Engine/Job/ScanSource";


export class Queue implements QueueContract {

    public name = "amqp";

    protected connectionString: string;

    protected connection: amqp.Connection;

    protected channel: amqp.Channel;

    protected bus: Bus;

    protected active: number;

    public constructor(options: Configuration, bus: Bus) {

        this.connectionString = options.values["AMQP_CONNECTION_STRING"];
        this.bus = bus;
    }

    protected async connect() {

        if(!this.connection) {

            this.connection = await amqp.connect(this.connectionString);

            const channel = await this.connection.createChannel();
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

        await this.connect();

        _.forEach(author.sources, (source, name) =>
            this.channel.sendToQueue("scan:sources", this.toJsonBuffer(<ScanSource>{

                authorId: author.id,
                sourceName: name,
                data: this.encodeJson("Source", source)
            }))
        );
    }

    public async work() {

        await this.connect();

        this.active = 1;

        const work = [
            this.workSources(),
            this.blockUntilFinished(),
        ];

        await Promise.all(work);

        console.log("leaving work");
    }

    public async workSources() {

        this.channel.consume("scan:sources", (message) => this.handleSource(message));
    }

    protected async blockUntilFinished() {

        const blocker = new Promise((resolve) => {

            //process.nextTick(() => {
            setImmediate(() => {

                if(this.active) {
console.log("blocking");
                    resolve(this.blockUntilFinished());
                }
                else {

                    resolve();
                }
            });
        });

        await blocker;
    }

    protected async handleSource(message: amqp.Message) {
console.log("handling something");

        ++this.active;

        await this.bus.dispatch("source", "scan", JSON.parse(message.content.toString()));

        --this.active;

        //await this.channel.ack(message);
    }

    public async setup(): Promise<void> {

        await this.connect();
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