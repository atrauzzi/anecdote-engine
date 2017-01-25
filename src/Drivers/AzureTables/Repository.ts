import {Repository as BaseRepository} from "../../Engine/Repository";
import {Author} from "../../Domain/Author";
import * as Azure from "azure";
import {AuthorFact} from "./Entity/Author";


export class Repository implements BaseRepository {

    public name = "azure tables";

    protected connection: Azure.TableService;

    public constructor(
        connectionString = "DefaultEndpointsProtocol=http;AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;TableEndpoint=http://10.0.75.1:10002/devstoreaccount1;",
    ) {
        this.connection = Azure.createTableService(connectionString)
    }

    public async setup(): Promise<void> {

        return new Promise<void>((resolve, reject) =>
            this.connection.createTableIfNotExists("authors", {}, (error) => error ? reject(error) : resolve()))
        .then(() => new Promise<void>((resolve, reject) =>
            this.connection.createTableIfNotExists("posts", {}, (error) => error ? reject(error) : resolve())));
    }

    public async addAuthor(author: Author): Promise<void> {

        const authorEntity = new AuthorFact(author);

        return new Promise<void>((resolve) => {
            this.connection.insertOrMergeEntity("authors", authorEntity, {}, () => resolve());
        });
    }

    public async loadAuthors(): Promise<Author[]> {

        return null;
    }

}