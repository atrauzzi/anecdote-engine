import {Entity} from "./Entity";


export abstract class Fact<T> extends Entity<T> {

    public PartitionKey: string;

    public constructor(data: T) {

        super(data);

        this.PartitionKey = "fact";
    }
}