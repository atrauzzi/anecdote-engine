import {Queue as BaseQueue} from "../../Engine/Queue";
import * as Azure from "azure";
import {Source} from "../../Domain/Source";



export class Queue implements BaseQueue {

    public name = "azure queues";

    dispatchScan(source: Source): Promise<void> {
        return undefined;
    }

    handleScan(): Promise<void> {
        return undefined;
    }

    setup(): Promise<void> {
        return undefined;
    }
}
