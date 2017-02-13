import {MongoClient, Db} from "mongodb";
import {Repository as RepositoryContract} from "../../Engine/Repository";
import {Author} from "../../Domain/Author";
import {Configuration} from "../../Engine/Configuration";


export class Repository implements RepositoryContract {

    public name = "mongodb";

    protected serverUri: string;

    protected db: Db;

    public constructor(options: Configuration) {

        this.serverUri = options.values["MONGODB_HOST"];
    }

    protected async connect() {

        if(!this.db) {

            process.on("exit", () => this.close());

            // ToDo: `connect` doesn't resolve, I'm not sure as to why
            //noinspection TypeScriptUnresolvedFunction
            this.db = await MongoClient.connect(this.serverUri);
        }
    }

    public async close() {

        console.log("closing");

        await this.db.close();
        this.db = null;
    }

    public async addAuthor(author: Author): Promise<void> {

        await this.connect();

        await this.db.collection("author")
            // ToDo: Need to open a ticket on the mongodb JIRA about this - https://jira.mongodb.org/browse/NODE
            .insertOne(JSON.parse(JSON.stringify(author)));
    }

    public async authors() {

        await this.connect();

        return await this.db.collection("author")
            .find<Author>()
            .toArray();
    }

    public async setup(): Promise<void> {

        await this.connect();
        console.log("Successfully connected to MongoDB!");
    }
}