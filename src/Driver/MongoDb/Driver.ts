import {MongoClient, Db, Collection} from "mongodb";
import {Driver as AnecdoteDriver} from "../../Engine/Driver";
import {Service as Bus} from "../../Bus/Service";
import {Configuration} from "./Configuration";


export abstract class Driver implements AnecdoteDriver {

    public name = "mongodb";

    protected connectionString: string;

    private db: Db;

    public constructor(configuration: Configuration, bus: Bus) {

        this.connectionString = configuration.MONGODB_CONNECTION_STRING;
    }

    public async connect() {

        if(!this.db) {

            //noinspection TypeScriptUnresolvedFunction
            this.db = await MongoClient.connect(this.connectionString);
        }
    }

    protected async save(collection: string, document: any) {

        const data = JSON.parse(JSON.stringify(document));

        await this.db.collection(collection)
            .insertOne(data);

    }

    protected collection(name: string): Collection {

        return this.db.collection(name);
    }

    public async close() {

        if(this.db) {

            await this.db.close();
            this.db = null;
        }
    }

    public async setup(): Promise<void> {

        console.log("Successfully connected to MongoDB!");
    }
}
