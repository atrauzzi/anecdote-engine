import {Source as SourceContract} from "../../Engine/Source";
import {Post} from "../../Domain/Post";
import {ScanSource} from "../../Engine/Job/ScanSource";
import * as Client from "github";
import * as moment from "moment";


export class Source implements SourceContract {

    public name = "github";

    protected client: Client;

    protected defaultLastScanned = moment().subtract(1, "year");

    public constructor() {

        this.client = new Client({
            headers: {
                "user-agent": "anecdote"
            }
        });
    }

    public setup(): Promise<void> {

        return null;
    }

    public async close() {

        return null;
    }

    public async scan(job: ScanSource) {

        const jobs = [
            this.loadBlogPosts(job),
            // this.loadMicroblogPosts(job),
            // this.loadSocialPosts(job),
            // this.loadCommentPosts(job),
        ];

        await Promise.all(jobs);
    }

    public async loadBlogPosts(job: ScanSource): Promise<Post[]> {

        const gists = await this.client.gists.getForUser({
            username: job.data.username,
            since: job.data.lastScanned || this.defaultLastScanned.toISOString(),
            per_page: 10,
        });

        console.log(gists);

        return null;
    }
}