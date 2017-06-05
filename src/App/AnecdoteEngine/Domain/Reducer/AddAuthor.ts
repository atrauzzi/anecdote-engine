import { BusReducer } from "protoculture";
import { AddAuthor as Action } from "../Action/AddAuthor";
import { Reducer } from "redux";


export class AddAuthor implements BusReducer<Action> {

    // todo: https://github.com/Microsoft/TypeScript/issues/16259
    public action: "add-author" = "add-author";

    public reducer(state: any, action: Action) {

        throw new Error("Method not implemented.");
    }
}
