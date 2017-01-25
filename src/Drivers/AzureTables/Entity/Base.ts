import * as Azure from "azure";
import * as _ from "lodash";


export interface EntityData {
    id: any;
}

// Note: This doesn't seem to work.
// See: https://github.com/Microsoft/TypeScript/issues/2225#issuecomment-161279156
// See: https://github.com/Microsoft/TypeScript/issues/4890
// See: https://github.com/Microsoft/TypeScript/pull/13604
//
//export type Base<T extends EntityData> = T & BaseEntity;

export abstract class Base<T extends EntityData> implements Azure.Entity {

    public abstract PartitionKey: string;

    public abstract RowKey: string;

    [property: string]: string | number | boolean | Date;

    public constructor(data: T) {

        _.assign(this, _.omit(data, [
            "table",
            "id",
            "PartitionKey",
            "RowKey",
        ]));
    }
}