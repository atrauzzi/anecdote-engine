

export interface Envelope<T> {

    topic: string;
    data?: T;

    channel?: string;

    timeStamp?: string;
}
