import {Source} from "./Source";


export interface Author {

    id: string;

    firstName: string;

    lastName: string;

    sources: {[index: string]: Source};

    created: Date;
}