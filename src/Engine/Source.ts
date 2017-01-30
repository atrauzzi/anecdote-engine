import {Driver} from "./Driver";
import {Post} from "../Domain/Post";


export interface Source extends Driver {

    loadCurrentPosts(): Promise<Post[]>;
}