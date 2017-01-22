import {Source} from "./Source";
import {Target} from "./Target";
import {Post} from "../Domain/Post";
import {DataSource} from "./DataSource";
import {Author} from "../Domain/Author";


export class Anecdote {

    protected authors: Author[];

    protected posts: Post[];

    public constructor(
        protected dataSource: DataSource,
        protected sources: Source[],
        protected targets: Target[],
    ) {
    }

    public async run() {

        console.log("Using data source:", this.dataSource.name);
        console.log("Using post sources:", this.sources.map((source) => source.name));
        console.log("Using post targets:", this.targets.map((source) => source.name));

        await this.loadAuthors();

    }

    public async setup(): Promise<void> {

        this.dataSource.setup();
        this.sources.forEach((source) => source.setup());
        this.targets.forEach((target) => target.setup());
    }

    private async loadAuthors() {
        this.authors = await this.dataSource.loadAuthors();
    }

}