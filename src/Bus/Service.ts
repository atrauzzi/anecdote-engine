import * as _ from "lodash";
import {Subscription} from "./Subscription";
import {Envelope} from "./Envelope";
import {Callback} from "./Callback";


// ToDo: Separate package called "bus service".."microtransit".."bus line"?
export class Service {

    protected subscriptions: {
        [channel: string]: {
            [topic: string]: Subscription<any, any>[]
        }
    } = {};

    public async dispatch<Data, Response>(channel: string, topic: string, data: Data) {

        const envelope = {
            channel: channel,
            topic: topic,
            data: data
        } as Envelope<Data>;

        const subscriptions = _.get(this.subscriptions, [channel, topic], []) as Subscription<Data, Response>[];

        const callbackPromises = _.map(subscriptions, (subscription) => subscription.callback(envelope));

        await Promise.all(callbackPromises);
    }

    public subscribe<Data, Response>(channel: string, topic: string, callback: Callback<Data, Response>): void {

        const registrations = _.get(this.subscriptions, [channel, topic], []);

        registrations.push({
            channel: channel,
            topic: topic,
            callback: callback,
        } as Subscription<Data, Response>);

        _.set(this.subscriptions, [channel, topic], registrations);
    }
}