

export interface Driver {

    name: string;

    setup(): Promise<void>;

    close(): Promise<void>;

    working?(): boolean;
}