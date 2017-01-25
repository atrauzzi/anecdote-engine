import {Repository} from "./Repository";
import {Source} from "./Source";
import {Target} from "./Target";


export class Options {

    constructor(
        source: {[key: string]: any},
        private repository = source["repository"],
        private sources = source["sources"],
        private targets = source["targets"],
    ) {

    }

    public createSources() {

        return this.sources.map((name: string) => this.createSource(name));
    }

    public createTargets() {

        return this.targets.map((name: string) => this.createTarget(name));
    }

    public createRepository() {

        const RepositoryType = this.create(this.repository).Repository;
        return new RepositoryType() as Repository;
    }

    private createSource(sourceName: string) {

        const SourceType = this.create(sourceName).Source;
        return new SourceType() as Source;
    }

    private createTarget(targetName: string) {

        const TargetType = this.create(targetName).Target;
        return new TargetType() as Target;
    }

    private create(driverName: string) {

        const driver = require(driverName);
        return driver;
    }
}