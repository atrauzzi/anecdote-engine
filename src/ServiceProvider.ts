import * as _ from "lodash";
import * as inversify from "inversify";
import {Types} from "./Engine";
import {Configuration} from "./Engine/Configuration";
import {Service} from "./Engine/Service";
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
        protected configuration: Configuration
    ) {

    }

    public bindAll() {

        //
        // Populate Type Metadata

        // ToDo: I really want runtime reflection.
        this.bindDriver(MongoDbDriver);

        inversify.decorate(inversify.injectable(), Service);
        inversify.decorate(inversify.inject(Types.Repository), Service, 0);
        inversify.decorate(inversify.multiInject(Types.Source), Service, 1);
        inversify.decorate(inversify.multiInject(Types.Queue), Service, 2);
        inversify.decorate(inversify.multiInject(Types.Target), Service, 3);
        inversify.decorate(inversify.inject(Types.Bus), Service, 4);

        //
        // Bind Implementations

        this.container.bind<Configuration>(Types.Configuration)
            .toConstantValue(this.configuration);

        this.container.bind<Service>(Types.Anecdote)
            .to(Service);

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

        _.forEach(this.configuration.sources, (source) => {

            const driver = this.bindDriver<Source>(source, "Source");

            inversify.decorate(inversify.inject(Types.Marked), driver, 2);

            this.container.bind<Source>(Types.Source)
                .to(driver);
        });
    }

    public bindQueues() {

        _.forEach(this.configuration.queues, (queue) => {

            const driver = this.bindDriver<Queue>(queue, "Queue");

            this.container.bind<Queue>(Types.Queue)
                .to(driver);
        });
    }

    public bindTargets() {

        _.forEach(this.configuration.targets, (target) => {

            const driver = this.bindDriver<Target>(target, "Queue");

            this.container.bind<Target>(Types.Target)
                .to(this.bindDriver<Target>(driver, "Target"));
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