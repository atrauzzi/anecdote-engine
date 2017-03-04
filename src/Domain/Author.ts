import {Source} from "./Source";


export class Author {

    public id: string;

    public firstName: string;

    public lastName: string;

    public sources: {[key: string]: Source} = {};

    public created: Date;
}