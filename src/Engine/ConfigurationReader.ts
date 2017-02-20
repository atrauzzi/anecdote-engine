import * as _ from "lodash";
import * as inversify from "inversify";
import {Types} from "../";
import {Types as EngineTypes} from "./";
import {Configuration} from "./Configuration";
import {Anecdote} from "./Anecdote";
import {DriverStatic} from "./DriverStatic";
import {Driver} from "./Driver";
import {Repository} from "./Repository";
import {Source} from "./Source";
import {Queue} from "./Queue";
import {Target} from "./Target";


export class ConfigurationReader {

    constructor(
        protected container: inversify.Container,
        protected configuration: {[key: string]: any}
    ) {

        inversify.decorate(inversify.injectable(), Configuration);

        this.container.bind<Configuration>(EngineTypes.Configuration)
            .toConstantValue(new Configuration(configuration["config"]));
    }

    public bindAll() {

        //
        // Populate Type Metadata
        this.container.bind<Anecdote>(EngineTypes.Anecdote)
            .to(Anecdote);

        inversify.decorate(inversify.injectable(), Anecdote);
        inversify.decorate(inversify.inject(EngineTypes.Repository), Anecdote, 0);
        inversify.decorate(inversify.multiInject(EngineTypes.Source), Anecdote, 1);
        inversify.decorate(inversify.multiInject(EngineTypes.Queue), Anecdote, 2);
        inversify.decorate(inversify.multiInject(EngineTypes.Target), Anecdote, 3);

        //
        // Bind Implementations
        this.bindRepository();
        this.bindSources();
        this.bindQueues();
        this.bindTargets();
    }

    public bindRepository() {

        this.container.bind<Repository>(EngineTypes.Repository)
            .to(this.create<Repository>(this.configuration["repository"], "Repository"));
    }

    public bindSources() {

        this.configuration["sources"].map((source: string) => {

            this.container.bind<Source>(EngineTypes.Source)
                .to(this.create<Source>(source, "Source"));
        });
    }

    public bindQueues() {

        this.configuration["queues"].map((queue: string) => {

            this.container.bind<Queue>(EngineTypes.Queue)
                .to(this.create<Queue>(queue, "Queue"));
        });
    }

    public bindTargets() {

        this.configuration["targets"].map((target: string) => {

            this.container.bind<Target>(EngineTypes.Target)
                .to(this.create<Target>(target, "Target"));
        });
    }

    private create<T extends Driver>(driver: string|DriverStatic<T>, type: string) {

        if(_.isString(driver)) {

            driver = require(driver as string)[type] as DriverStatic<T>;
        }

        inversify.decorate(inversify.injectable(), driver);
        inversify.decorate(inversify.inject(EngineTypes.Configuration), driver, 0);
        inversify.decorate(inversify.inject(Types.Postal), driver, 1);

        return driver as DriverStatic<T>;
    }
}