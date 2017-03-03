import * as _ from "lodash";
import fetch from "node-fetch";
import * as chance from "chance";
import * as moment from "moment";
import * as Client from "github";
import {typeMap} from "../../Domain/PostType";
import {Configuration} from "./Configuration";
import {Service as Bus} from "../../Bus/Service";
import {Source as SourceContract} from "../../Engine/Source";
import {ScanSource} from "../../Engine/Job/ScanSource";
import {PostFound} from "../../Engine/Job/PostFound";
import {Post} from "../../Domain/Post";


export class Source implements SourceContract {

    public name = "github";

    protected client: Client;

    protected defaultLastScanned = moment().subtract(3, "months");

    public constructor(
        configuration: Configuration,
        protected bus: Bus,
        protected marked: MarkedStatic
    ) {

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

    public async loadBlogPosts(job: ScanSource): Promise<any> {

        const gists = await this.client.gists.getForUser({
            username: job.data.username,
            since: job.data.lastScanned || this.defaultLastScanned.toISOString(),
            per_page: 10,
        });

        await Promise.all(_.map(gists.data, (gist) => this.gistToBlogPost(gist, job.authorId)));
    }

    protected async gistToBlogPost(gist: any, authorId: string) {

        const markdown: any = _.find(gist.files, (file: any) => file.language === "Markdown");

        if(
            markdown
            && gist.description.includes(typeMap.blog)
        ) {

            const contentResponse = await fetch(markdown.raw_url);

            const contentMarkdown = await contentResponse.text();
            const contentHtml = this.marked(contentMarkdown);

            const post = new Post();

            post.id = chance().guid();
            post.source = this.name;
            post.nativeId = gist.owner.id;
            post.authored = moment.utc(gist.created_at).toDate();
            post.contentHtml = contentHtml;
            post.title = _.replace(gist.description, typeMap.blog, "").trim();
            post.uri = gist.url;
            post.type = typeMap.blog;
            post.authorId = authorId;

            await this.bus.dispatch("post", "found", {
                post: post,
            } as PostFound);
        }
    }
}