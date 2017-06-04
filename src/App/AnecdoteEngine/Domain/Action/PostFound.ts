import * as Redux from "redux";
import { Post } from "../Post";


export interface PostFound extends Redux.Action {

    post: Post;
}
