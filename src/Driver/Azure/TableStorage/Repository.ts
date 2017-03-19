import {Repository as RepositoryContract} from "../../../Engine/Repository";
import {Configuration} from "../Configuration";
import {Service as Bus} from "../../../Bus/Service";
import {Author} from "../../../Domain/Author";
import {ScanSource} from "../../../Engine/Job/ScanSource";
import * as Azure from "azure";
import {AuthorFact} from "./AuthorFact";


export abstract class Repository implements RepositoryContract {

    public name = "azure-table-storage-repository";

    protected connectionString: string;

    private db: Azure.TableService;

    public constructor(
        protected configuration: Configuration,
        protected bus: Bus
    ) {

        this.connectionString = configuration.AZURE_STORAGE_CONNECTION_STRING;
    }

    public async connect() {

        if(!this.db) {

            this.db = Azure.createTableService(this.connectionString);
        }
    }

    public async close() {

        this.db = null;
    }

    public async setup(): Promise<void> {

        await new Promise<void>((resolve, reject) =>
            this.db.createTableIfNotExists("authors", {}, (error) => error ? reject(error) : resolve()));

        await new Promise<void>((resolve, reject) =>
            this.db.createTableIfNotExists("posts", {}, (error) => error ? reject(error) : resolve()));
    }

    public async addAuthor(author: Author): Promise<any> {

        const authorFact = new AuthorFact(author);

        await new Promise<void>((resolve, reject) =>
            this.db.insertOrMergeEntity("author", authorFact, (error) => error ? reject(error) : resolve()));
    }

    public async authors() {

        const query = new Azure.TableQuery()
            .from("author");

        const authors = await new Promise<Azure.Entity[]>((resolve, reject) =>
            this.db.queryEntities(query, (error, entities) =>
                error ? reject(error) : resolve(entities)));

        return authors.map((author) =>
            new JSON.parse(author["value"] as string));
    }

    public recordScan(job: ScanSource): void {

        //console.log("ToDo: Save recording of scan: ", job);
    }
}