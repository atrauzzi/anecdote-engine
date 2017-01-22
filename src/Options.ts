import * as Commander from "commander";
import {DriverStatic} from "./Engine/DriverStatic";
import {Source} from "./Engine/Source";
import {Target} from "./Engine/Target";


export class Options {

    constructor(
        command: Commander.IExportedCommand,
        private sources = command["sources"],
        private targets = command["targets"]
    ) {
    }

    public createSources() {
        return this.sources.map((name: string) => this.createSource(name));
    }

    public createTargets() {
        return this.targets.map((name: string) => this.createTarget(name));
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