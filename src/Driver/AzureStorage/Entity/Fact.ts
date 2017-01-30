import {Base} from "./Base";


export abstract class Fact<T> extends Base<T> {

    public PartitionKey: string;

    public constructor(type: string, data: T) {

        super(type, data);

        this.PartitionKey = "fact";
    }
}