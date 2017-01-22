import {DataSource as BaseDataSource} from "../../DataSource";
import {Author} from "../../../Domain/Author";
import * as Azure from "azure";
import * as Bluebird from "bluebird";


export class DataSource implements BaseDataSource {

    public name = "azure tables";

    protected connection: Azure.TableService;

    public constructor(
        connectionString = "UseDevelopmentStorage=true",
    ) {
        this.connection = Azure.createTableService(connectionString)
    }

    public async setup(): Promise<void> {

        const createTableIfNotExists = Bluebird.promisify(this.connection.createTableIfNotExists);

        await createTableIfNotExists("authors");
        await createTableIfNotExists("posts");
    }

    public async addAuthor(): Promise<void> {
        
        return null;
    }

    public async loadAuthors(): Promise<Author[]> {

        return null;
    }

}