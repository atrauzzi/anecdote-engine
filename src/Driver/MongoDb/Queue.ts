import {Queue as QueueContract} from "../../Engine/Queue";
import {Author} from "../../Domain/Author";


export class Queue implements QueueContract {

    name: string;

    constructor (config?: {[key: string]: any}) {

    }

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