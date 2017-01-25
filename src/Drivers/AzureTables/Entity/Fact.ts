import {Base, EntityData} from "./Base";


export abstract class Fact<T extends EntityData> extends Base<T> {

    public get PartitionKey() { return "fact" }
}