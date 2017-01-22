import {DataSource as BaseDataSource} from "../../DataSource";
import {Author} from "../../../Domain/Author";
import * as Azure from "azure";


export class DataSource implements BaseDataSource {

    public name = "azure tables";

    protected connection: Azure.TableService;

    public constructor(
        connectionString = "UseDevelopmentStorage=true",
    ) {
        this.connection = Azure.createTableService(connectionString)
    }

    public async setup(): Promise<void> {

        return new Promise<void>((resolve) =>
            this.connection.createTableIfNotExists("authors", {}, () => resolve()))
        .then(() => new Promise<void>((resolve) =>
            this.connection.createTableIfNotExists("posts", {}, () => resolve())));
    }

    public async addAuthor(): Promise<void> {
        
        return null;
    }

    public async loadAuthors(): Promise<Author[]> {

        return null;
    }

}