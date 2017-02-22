import * as _ from "lodash";
import protobuf from "../../Protobuf";
import {Queue as QueueContract} from "../../Engine/Queue";
import {Configuration} from "../../Engine/Configuration";
import {Author} from "../../Domain/Author";
import * as amqp from "amqplib";
import {ScanSource} from "../../Engine/Job/ScanSource";
import {Replies} from "amqplib";


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

        const work = [
            this.workSources(),
        ];

        await Promise.all(work);
    }

    public async workSources(): Promise<Replies.Consume> {

        return this.channel.consume("scan:sources", (message) => this.handleSource(message));
    }

    protected async handleSource(message: amqp.Message) {

        this.bus.publish({
            channel: "source",
            topic: "scan",
            data: JSON.parse(message.content.toString())
        });

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