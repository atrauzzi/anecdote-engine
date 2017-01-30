import {Queue as BaseQueue} from "../../Engine/Queue";
import * as Azure from "azure";
import {Author} from "../../Domain/Author";


export class Queue implements BaseQueue {

    public name = "azure queues";

    dispatchScan(author: Author): Promise<void> {
        return undefined;
    }

    handleScan(): Promise<void> {
        return undefined;
    }

    setup(): Promise<void> {
        return undefined;
    }
}
