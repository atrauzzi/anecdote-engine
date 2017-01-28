import {Source} from "./Source";


export class Author {

    public firstName: string;

    public lastName: string;

    public sources: {[key: string]: Source} = {};

    public created: Date;
}