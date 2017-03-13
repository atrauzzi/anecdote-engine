import {PostType} from "./PostType";


export interface Post {

    id: string;

    authorId: string;

    title: string;

    contentHtml: string;

    authored: Date;

    type: PostType;

    uri: string;

    nativeId: string;

    source: string;
}