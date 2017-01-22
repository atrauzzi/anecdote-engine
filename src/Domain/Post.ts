import {Author} from "./Author";


export class Post {

    public constructor(
        public id: string,
        public author: Author,
        public title: string,
        public content: string,
        public authored: Date,
    ) {
    }
}