import {Source} from "./Source";
import {Target} from "./Target";
import {Post} from "../Domain/Post";
import {Author} from "../Domain/Author";


export class Anecdote {

    protected authors: Author[];

    protected posts: Post[];

    public constructor(
        protected sources: Source[],
        protected targets: Target[]
    ) {
    }

    public async run() {

        console.log("Using sources:", this.sources.map((source) => source.name));
        console.log("Using targets:", this.targets.map((source) => source.name));

        

    }

}