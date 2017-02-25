import {Driver} from "./Driver";
import {Post} from "../Domain/Post";


export interface Target extends Driver {

    savePost(post: Post): Promise<any>;
}