import {Configuration as EngineConfiguration} from "../../Engine/Configuration";


export interface Configuration extends EngineConfiguration {

    AZURE_SERVICEBUS_CONNECTION_STRING: string;
}
