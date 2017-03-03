import {Types} from "./Engine/index";
import {container} from "./Container";
import {ServiceProvider} from "./ServiceProvider";
import {Service} from "./Engine/Service";
import {Configuration} from "./Engine/Configuration";


export function build<DriverConfigurations>(configuration: Configuration & DriverConfigurations) {

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
