import {Fact} from "./Fact";
import {Author} from "../../../Domain/Author";


export class AuthorFact extends Fact<Author> {

    public get RowKey() { return (this as any).id }
}