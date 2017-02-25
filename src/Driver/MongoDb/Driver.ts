import {Driver as AnecdoteDriver} from "../../Engine/Driver";
import {Configuration} from "../../Engine/Configuration";
import {MongoClient, Db} from "mongodb";


export abstract class Driver implements AnecdoteDriver {

    public name = "mongodb";

    protected serverUri: string;

    protected db: Db;

    public constructor(options: Configuration, bus: IPostal) {

        this.serverUri = options.values["MONGODB_HOST"];
    }

    protected async connect() {

        if(!this.db) {

            this.db = await MongoClient.connect(this.serverUri);
        }
    }

    protected async save(collection: string, document: any) {

        const data = JSON.parse(JSON.stringify(document));

        await this.db.collection(collection)
            .insertOne(data);
    }

    public async close() {

        if(this.db) {

            await this.db.close();
            this.db = null;
        }
    }

    public async setup(): Promise<void> {

        await this.connect();
        console.log("Successfully connected to MongoDB!");
    }
}
