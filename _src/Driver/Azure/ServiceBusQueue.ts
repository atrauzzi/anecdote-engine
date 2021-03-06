import * as _ from "lodash";
import {Queue as QueueContract} from "../../Engine/Queue";
import {Configuration} from "./Configuration";
import {Service as Bus} from "../../Bus/Service";
import * as Azure from "azure";
import {Author} from "../../Domain/Author";
import {ScanSource} from "../../Engine/Job/ScanSource";
import {Source} from "../../Domain/Source";


export class Queue implements QueueContract {

    public name = "azure-servicebus-queue";

    protected connectionString: string;

    // ToDo: ServiceBusService needs typing info - https://github.com/Azure/azure-sdk-for-node/issues/2083
    protected connection: Azure.ServiceBusService & any;

    protected bus: Bus;

    protected active = 0;

    protected scanSourcesQueue = "scan-sources";

    public constructor(options: Configuration, bus: Bus) {

        this.connectionString = options.AZURE_SERVICEBUS_CONNECTION_STRING;
        this.bus = bus;
    }

    public async connect() {

        if(!this.connection) {

            this.connection = Azure.createServiceBusService(this.connectionString);
        }
    }

    public async close() {

        if(this.connection) {

            this.connection = null;
        }
    }

    public async dispatchSourceScans(author: Author) {

        const deferred = this.defer();

        _.forEach(author.sources, (source: Source, name) => {

            ++this.active;

            const message = <ScanSource> {
                authorId: author.id,
                sourceName: name,
                data: source
            };

            this.connection.sendQueueMessage(this.scanSourcesQueue, message, (err: any) => {

                --this.active;

                if(err) {

                    deferred.reject(err);
                }
                // Complete the deferred if we're the last one.
                if(!this.working()) {

                    deferred.resolve();
                }
            });
        });

        await deferred.promise;
    }

    public working() {

        return !!this.active;
    }

    public async work() {

        throw new Error("Not implemented.");
    }

    public workSources() {

        throw new Error("Not implemented.");
    }

    public async setup(): Promise<void> {

        const deferred = this.defer();

        if(this.connection) {

            ++this.active;

            console.log("Creating Service Bus Queues - Please note, if deploying to Azure, use the ARM template instead!");

            this.connection.createQueueIfNotExists(this.scanSourcesQueue, (err: any) => {

                --this.active;

                if(err) {

                    return deferred.reject(err);
                }

                console.log("Service Bus Queues Created");
                return deferred.resolve();
            });
        }

        await deferred.promise;
    }

    protected defer() {

        let resolve = () => {};
        let reject = (data: any) => {};

        const promise = new Promise(function () {

            resolve = arguments[0];
            reject = arguments[1];
        });

        return {
            resolve: resolve,
            reject: reject,
            promise: promise
        };
    }
}