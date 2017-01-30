import {Fact} from "./Fact";
import {Author} from "../../../Domain/Author";


export class AuthorFact extends Fact<Author> {

    public RowKey: string;

    public constructor(author: Author) {

        super("Author", author);

        this.RowKey = author.firstName + author.lastName;
    }
}