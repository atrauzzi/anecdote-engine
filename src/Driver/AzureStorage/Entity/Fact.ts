import {Base} from "./Base";


export abstract class Fact<T> extends Base<T> {

    public PartitionKey: string;

    public constructor(data: T) {

        super(data);

        this.PartitionKey = "fact";
    }
}