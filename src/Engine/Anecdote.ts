import {Source} from "./Source";
import {Target} from "./Target";
import {Post} from "../Domain/Post";
import {Repository} from "./Repository";
import {Author} from "../Domain/Author";


export class Anecdote {

    protected authors: Author[];

    protected posts: Post[];

    public constructor(
        protected repository: Repository,
        protected sources: Source[],
        protected targets: Target[],
    ) {
    }

    public async run() {

        console.log("Using data source:", this.repository.name);
        console.log("Using post sources:", this.sources.map((source) => source.name));
        console.log("Using post targets:", this.targets.map((source) => source.name));

        await this.loadAuthors();
    }

    public async setup(): Promise<void> {

        await this.repository.setup();
        await this.sources.forEach((source) => source.setup());
        await this.targets.forEach((target) => target.setup());
    }

    private async loadAuthors() {

        this.authors = await this.repository.loadAuthors();
    }

}