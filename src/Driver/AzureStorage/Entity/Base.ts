import * as Azure from "azure";


export abstract class Base<T> implements Azure.Entity {

    public abstract PartitionKey: string;

    public abstract RowKey: string;

    public value: string;

    [property: string]: string | number | boolean | Date;

    public constructor(data: T) {

        this.value = JSON.stringify(data);
    }
}
