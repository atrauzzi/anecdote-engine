import * as Azure from "azure";


export abstract class Entity<T> implements Azure.Entity {

    public abstract PartitionKey: string;

    public abstract RowKey: string;

    [property: string]: string | number | boolean | Date;

    public constructor(
        data: T,
        public value: string = JSON.stringify(data)
    ) {

    }
}