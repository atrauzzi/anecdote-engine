import {Callback} from "./Callback";


export interface Subscription<Data, Response> {

    channel: string;

    topic: string;

    callback: Callback<Data, Response>;
}