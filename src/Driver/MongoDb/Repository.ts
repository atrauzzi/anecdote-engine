import {MongoClient} from "mongodb";
import {Repository as RepositoryContract} from "../../Engine/Repository";
import {Author} from "../../Domain/Author";


export class Repository implements RepositoryContract {

    name: string;

    addAuthor(author: Author): Promise<void> {

        return undefined;
    }

    loadAuthors(): Promise<Author[]> {
        return undefined;
    }

    setup(): Promise<void> {
        return undefined;
    }
}