import {Configuration as EngineConfiguration} from "../../Engine/Configuration";


export interface Configuration extends EngineConfiguration {

    values: {

        AMQP_CONNECTION_STRING: string,
    }
}
