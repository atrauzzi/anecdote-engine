import {Post} from "./Post";


export class Author {

    public constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public nativeIds: {[key: string]: string} = {},
        public posts: Post[],
    ) {
    }
}