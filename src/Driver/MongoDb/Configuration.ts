import {Configuration as EngineConfiguration} from "../../Engine/Configuration";


export interface Configuration extends EngineConfiguration {

    values: {

        MONGODB_HOST: string,
    }
}
