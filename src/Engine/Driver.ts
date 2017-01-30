

export interface Driver {

    name: string;

    setup(): Promise<void>;
}