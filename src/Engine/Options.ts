import {Repository} from "./Repository";
import {Source} from "./Source";
import {Queue} from "./Queue";
import {Target} from "./Target";


export class Options {

    constructor(
        source: {[key: string]: any},
        private repository = source["repository"],
        private sources = source["sources"],
        private queues = source["queues"],
        private targets = source["targets"],
        public config = source["config"],
    ) {

    }

    public createRepository() {

        const RepositoryType = this.create(this.repository).Repository;
        return new RepositoryType(this.config) as Repository;
    }

    public createSources() {

        return this.sources.map((name: string) => this.createSource(name));
    }

    public createQueues() {

        return this.queues.map((name: string) => this.createQueue(name));
    }

    public createTargets() {

        return this.targets.map((name: string) => this.createTarget(name));
    }

    private createSource(sourceName: string) {

        const SourceType = this.create(sourceName).Source;
        return new SourceType(this.config) as Source;
    }

    private createQueue(queueName: string) {

        const QueueType = this.create(queueName).Queue;
        return new QueueType(this.config) as Queue;
    }

    private createTarget(targetName: string) {

        const TargetType = this.create(targetName).Target;
        return new TargetType(this.config) as Target;
    }

    private create(driverName: string) {

        const driver = require(driverName);
        return driver;
    }
}