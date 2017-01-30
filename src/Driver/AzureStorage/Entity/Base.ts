import * as Azure from "azure";
import protobufMeta from "../../../Domain/protobuf_meta";


export abstract class Base<T> implements Azure.Entity {

    public abstract PartitionKey: string;

    public abstract RowKey: string;

    [property: string]: string | number | boolean | Date;

    public constructor(
        type: string,
        data: T,
        public value: string = protobufMeta
            .lookupType(type)
            .encode(data)
            .finish()
            .toString()
    ) {

    }
}
