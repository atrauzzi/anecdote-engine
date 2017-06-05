import { Action } from "redux";
import { Author } from "../Author";


export interface AddAuthor extends Action {

    type: "add-author";

    author: Author;
}
