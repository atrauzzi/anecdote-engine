import "reflect-metadata";
import * as dotenv from "dotenv";
import * as _ from "lodash";
import * as protobuf from "protobufjs";
import * as domainModels from "./Domain/index";
import protobufMeta from "./Protobuf";


//
// Environment
export const manifest = require(__dirname + "/../package.json");
export const environment = (dotenv.config() as any).parsed;
export {container} from "./Container";



//
// Protocol Buffers
_.forEach(domainModels, (domainModel, name) => {

    try {
        protobuf.Class.create(protobufMeta.lookupType(name), domainModel)
    }
    catch(ex) {
        // ToDo: Enums cause exceptions.
    }
});
