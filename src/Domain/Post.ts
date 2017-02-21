import {Author} from "./Author";
import {PostType} from "./PostType";


export class Post {

    public author: Author;

    public title: string;

    public content: string;

    public authored: Date;

    public type: PostType;

    public uri: string;
}