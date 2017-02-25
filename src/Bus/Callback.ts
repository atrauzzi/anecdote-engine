import {Envelope} from "./Envelope";


export interface Callback<Data, Response> {

    (envelope: Envelope<Data>): Promise<Response>;
}