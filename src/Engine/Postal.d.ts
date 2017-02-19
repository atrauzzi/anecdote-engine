// ToDo: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/14717

declare module "postal" {

    export interface Configuration {

        SYSTEM_CHANNEL: string;
        DEFAULT_CHANNEL: string;
        resolver: Resolver;
    }

    export interface Resolver {

        compare(binding: string, topic: string, headerOptions: {}): boolean;
        reset(): void;
        purge(options?: {topic?: string, binding?: string, compact?: boolean}): void;
    }

    export interface Callback<T> {

        (data: T, envelope: Envelope<T>): void
    }

    export interface SubscriptionDefinition<T> {

        channel: string;
        topic: string;
        callback: Callback<T>;

        // after and before lack documentation

        constraint(predicateFn: (data: T, envelope: Envelope<T>) => boolean): SubscriptionDefinition<T>;
        constraints(predicateFns: ((data: T, envelope: Envelope<T>) => boolean)[]): SubscriptionDefinition<T>;
        context(theContext: any): SubscriptionDefinition<T>;
        debounce(interval: number): SubscriptionDefinition<T>;
        defer(): SubscriptionDefinition<T>;
        delay(waitTime: number): SubscriptionDefinition<T>;
        disposeAfter(maxCalls: number): SubscriptionDefinition<T>;
        distinct(): SubscriptionDefinition<T>;
        distinctUntilChanged(): SubscriptionDefinition<T>;
        logError(): SubscriptionDefinition<T>;
        once(): SubscriptionDefinition<T>;
        throttle(interval: number): SubscriptionDefinition<T>;
        subscribe(callback: Callback<T>): SubscriptionDefinition<T>;
        unsubscribe(): void;
    }

    export interface Envelope<T> {

        topic: string;
        data?: T;

        /*Uses DEFAULT_CHANNEL if no channel is provided*/
        channel?: string;

        timeStamp?: string;
    }


    export interface ChannelDefinition<T> {

        subscribe(topic: string, callback: Callback<T>): SubscriptionDefinition<T>;

        publish(topic: string, data?: T): void;

        channel: string;
    }

    export interface Postal {

        subscriptions: {};
        wireTaps: Callback<any>[];

        addWireTap(callback: Callback<any>): () => void;

        channel<T>(name?: string): ChannelDefinition<T>;

        getSubscribersFor(): SubscriptionDefinition<any>[];
        getSubscribersFor(options: {channel?: string, topic?: string, context?: any}): SubscriptionDefinition<any>[];
        getSubscribersFor(predicateFn: (sub: SubscriptionDefinition<any>) => boolean): SubscriptionDefinition<any>[];

        publish(envelope: Envelope<any>): void;

        reset(): void;

        subscribe(options: {channel?: string, topic: string, callback: Callback<any>}): SubscriptionDefinition<any>;
        unsubscribe(sub: SubscriptionDefinition<any>): void;
        unsubscribeFor(): void;
        unsubscribeFor(options: {channel?: string, topic?: string, context?: any}): void;

        configuration: Configuration;
    }

    const postal: Postal;
    export = postal;
}
