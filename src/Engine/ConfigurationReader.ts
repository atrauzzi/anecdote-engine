import * as _ from "lodash";
import * as inversify from "inversify";
import {Types} from "./";
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

        this.container.bind<Configuration>(Types.Configuration)
            .toConstantValue(new Configuration(configuration["config"]));
    }

    public bindAll() {

        //
        // Populate Type Metadata
        this.container.bind<Anecdote>(Types.Anecdote)
            .to(Anecdote);

        inversify.decorate(inversify.injectable(), Anecdote);
        inversify.decorate(inversify.inject(Types.Repository), Anecdote, 0);
        inversify.decorate(inversify.multiInject(Types.Source), Anecdote, 1);
        inversify.decorate(inversify.multiInject(Types.Queue), Anecdote, 2);
        inversify.decorate(inversify.multiInject(Types.Target), Anecdote, 3);

        //
        // Bind Implementations
        this.bindRepository();
        this.bindSources();
        this.bindQueues();
        this.bindTargets();
    }

    public bindRepository() {

        this.container.bind<Repository>(Types.Repository)
            .to(this.create<Repository>(this.configuration["repository"], "Repository"));
    }

    public bindSources() {

        this.configuration["sources"].map((source: string) => {

            inversify.decorate(inversify.injectable(), source);
            inversify.decorate(inversify.inject(Types.Configuration), source, 0);

            this.container.bind<Source>(Types.Source)
                .to(this.create<Source>(source, "Source"));
        });
    }

    public bindQueues() {

        this.configuration["queues"].map((queue: string) => {

            inversify.decorate(inversify.injectable(), queue);
            inversify.decorate(inversify.inject(Types.Configuration), queue, 0);

            this.container.bind<Queue>(Types.Queue)
                .to(this.create<Queue>(queue, "Queue"));
        });
    }

    public bindTargets() {

        this.configuration["targets"].map((target: string) => {

            inversify.decorate(inversify.injectable(), target);
            inversify.decorate(inversify.inject(Types.Configuration), target, 0);

            this.container.bind<Target>(Types.Target)
                .to(this.create<Target>(target, "Target"));
        });
    }

    private create<T extends Driver>(driver: string|DriverStatic<T>, type: string) {

        if(_.isString(driver)) {

            return require(driver as string)[type] as DriverStatic<T>;
        }

        return driver as DriverStatic<T>;
    }
}