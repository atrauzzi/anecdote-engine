import * as _ from "lodash";
import * as protobuf from "protobufjs";
import * as domainModels from "./Domain/index";
import protobufMeta from "./Domain/protobuf_meta";


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



//
// Dependency Injection

// ToDo: If we added a dependency injector, this file is where it would be configured.