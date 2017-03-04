import {Author} from "./Author";
import {PostType} from "./PostType";


export class Post {

    public id: string;

    public authorId: string;

    public title: string;

    public contentHtml: string;

    public authored: Date;

    public type: PostType;

    public uri: string;

    public nativeId: string;

    public source: string;
}