import {Repository as BaseRepository} from "../../Engine/Repository";
import {Options} from "./Options";
import {Author} from "../../Domain/Author";
import * as Azure from "azure";
import {Base as Entity} from "./Entity/Base";
import {AuthorFact} from "./Entity/AuthorFact";


export class Repository implements BaseRepository {

    public name = "azure tables";

    protected connection: Azure.TableService;

    public constructor(options: Options) {

        this.connection = Azure.createTableService(options.AZURE_STORAGE_CONNECTION_STRING);
    }

    public async setup(): Promise<void> {

        return new Promise<void>((resolve, reject) =>
            this.connection.createTableIfNotExists("authors", {}, (error) => error ? reject(error) : resolve()))
        .then(() => new Promise<void>((resolve, reject) =>
            this.connection.createTableIfNotExists("posts", {}, (error) => error ? reject(error) : resolve())));
    }

    public async addAuthor(author: Author): Promise<void> {

        const authorFact = new AuthorFact(author);

        await this.insertOrMergeEntity("authors", authorFact);
    }

    public async loadAuthors(): Promise<Author[]> {

        var query = new Azure.TableQuery()
            .from("authors");

        return this.queryEntities<Author>(query);
    }

    private async queryEntities<T>(query: Azure.TableQuery) {

        return new Promise<T>((resolve, reject) => {

            this.connection.queryEntities(
                query,
                (error, result, response) => this.azureCallback<T>(resolve, reject, error, result, response)
            );
        });
    }

    private async insertOrMergeEntity(table: string, entity: Entity<any>) {

        return new Promise<void>((resolve, reject) => {

            this.connection.insertOrMergeEntity(
                table,
                entity,
                (error, result, response) => this.azureCallback(resolve, reject, error, result, response)
            );
        });
    }

    private azureCallback<T>(
        resolve: () => void,
        reject: (reason: any) => void,
        error: any,
        result: any,
        response: any
    ) {
        if(error) {
            reject(JSON.stringify(response, null, 3));
        }

        if(result) {

        }

        resolve();
    }
}