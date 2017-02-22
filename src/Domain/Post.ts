import {Author} from "./Author";
import {PostType} from "./PostType";


export class Post {

    public id: string;

    public authorId: string;

    public title: string;

    public content: string;

    public authored: Date;

    public type: PostType;

    public uri: string;
}