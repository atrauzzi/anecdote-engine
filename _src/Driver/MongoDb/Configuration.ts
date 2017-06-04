import {Configuration as EngineConfiguration} from "../../Engine/Configuration";


export interface Configuration extends EngineConfiguration {

    MONGODB_CONNECTION_STRING: string;
}
