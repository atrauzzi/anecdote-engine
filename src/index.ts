import {Types} from "./Engine/index";
import {container} from "./Container";
import {ServiceProvider} from "./ServiceProvider";
import {Service} from "./Engine/Service";
import {Configuration} from "./Engine/Configuration";
import {Repository as MongoDbRepository} from "./Driver/MongoDb/Repository";
import {Source as GithubSource} from "./Driver/Github/Source";
import {Queue} from "./Driver/Amqp/Queue";
import {Target} from "./Driver/MongoDb/Target";


export function build<DriverConfigurations>(configuration: Configuration & DriverConfigurations) {

    // Note: Any of these values that are missing will be replaced with these defaults.
    configuration.repository = configuration.repository || MongoDbRepository;
    configuration.sources = configuration.sources || [
        GithubSource,
    ];
    configuration.queues = configuration.queues || [
        Queue,
    ];
    configuration.targets = configuration.targets || [
        Target,
    ];

    const serviceProvider = new ServiceProvider(container, configuration);
    serviceProvider.bindAll();

    return container.get<Service>(Types.Anecdote);
}

export {Post} from "./Domain/Post";

export {Service}

export {Configuration as MongoDbConfiguration} from "./Driver/MongoDb/Configuration";
export {Repository as MongoDbRepository} from "./Driver/MongoDb/Repository";
export {Target as MongoDbTarget} from "./Driver/MongoDb/Target";

export {Configuration as AmqpConfiguration} from "./Driver/Amqp/Configuration";
export {Queue as AmqpQueue} from "./Driver/Amqp/Queue";

export {Configuration as GithubConfiguration} from "./Driver/Github/Configuration";
export {Source as GithubSource} from "./Driver/Github/Source";
