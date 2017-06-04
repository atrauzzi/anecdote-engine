

export interface Driver {

    name: string;

    setup(): Promise<void>;

    connect(): Promise<void>;

    close(): Promise<void>;

    working?(): boolean;
}