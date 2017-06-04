import * as Redux from "redux";
import { Author } from "../Author";


export interface AddAuthor extends Redux.Action {

    author: Author;
}
