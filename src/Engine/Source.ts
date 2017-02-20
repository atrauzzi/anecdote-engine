import {Driver} from "./Driver";
import {Post} from "../Domain/Post";


export interface Source extends Driver {

    //scan(): Promise<any>;

    loadCurrentPosts(): Promise<Post[]>;
}