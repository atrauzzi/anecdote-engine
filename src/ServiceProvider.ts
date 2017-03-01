import * as _ from "lodash";
import * as inversify from "inversify";
import {Types} from "./Engine";
import {Configuration} from "./Engine/Configuration";
import {Anecdote} from "./Engine/Anecdote";
import {DriverStatic} from "./Engine/DriverStatic";
import {Driver} from "./Engine/Driver";
import {Driver as MongoDbDriver} from "./Driver/MongoDb/Driver";
import {Repository} from "./Engine/Repository";
import {Source} from "./Engine/Source";
import {Queue} from "./Engine/Queue";
import {Target} from "./Engine/Target";


export class ServiceProvider {

    constructor(
        protected container: inversify.Container,
        protected configuration: {[key: string]: any}
    ) {
    }

    public bindAll() {

        //
        // Populate Type Metadata

        inversify.decorate(inversify.injectable(), Configuration);

        // ToDo: I really want runtime reflection.
        this.bindDriver(MongoDbDriver);

        inversify.decorate(inversify.injectable(), Anecdote);
        inversify.decorate(inversify.inject(Types.Repository), Anecdote, 0);
        inversify.decorate(inversify.multiInject(Types.Source), Anecdote, 1);
        inversify.decorate(inversify.multiInject(Types.Queue), Anecdote, 2);
        inversify.decorate(inversify.multiInject(Types.Target), Anecdote, 3);
        inversify.decorate(inversify.inject(Types.Bus), Anecdote, 4);

        //
        // Bind Implementations

        this.container.bind<Configuration>(Types.Configuration)
            .toConstantValue(new Configuration(this.configuration["config"]));

        this.container.bind<Anecdote>(Types.Anecdote)
            .to(Anecdote);

        this.bindRepository();
        this.bindSources();
        this.bindQueues();
        this.bindTargets();
    }

    public bindRepository() {

        this.container.bind<Repository>(Types.Repository)
            .to(this.bindDriver<Repository>(this.configuration["repository"], "Repository"));
    }

    public bindSources() {

        this.configuration["sources"].map((source: string) => {

            inversify.decorate(inversify.inject(Types.Marked), source, 2);

            this.container.bind<Source>(Types.Source)
                .to(this.bindDriver<Source>(source, "Source"));
        });
    }

    public bindQueues() {

        this.configuration["queues"].map((queue: string) => {

            this.container.bind<Queue>(Types.Queue)
                .to(this.bindDriver<Queue>(queue, "Queue"));
        });
    }

    public bindTargets() {

        this.configuration["targets"].map((target: string) => {

            this.container.bind<Target>(Types.Target)
                .to(this.bindDriver<Target>(target, "Target"));
        });
    }

    private bindDriver<T extends Driver>(driver: any, type?: string) {

        if(_.isString(driver)) {

            driver = require(driver as string)[type] as DriverStatic<T>;
        }

        inversify.decorate(inversify.injectable(), driver);
        inversify.decorate(inversify.inject(Types.Configuration), driver, 0);
        inversify.decorate(inversify.inject(Types.Bus), driver, 1);

        return driver as DriverStatic<T>;
    }
}