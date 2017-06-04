import {Configuration as EngineConfiguration} from "../../Engine/Configuration";


export interface Configuration extends EngineConfiguration {

    AMQP_CONNECTION_STRING: string;
}
