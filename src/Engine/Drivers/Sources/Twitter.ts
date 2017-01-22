import {Source as SourceContract} from "../../Source";
import {Post} from "../../../Domain/Post";


export class Source implements SourceContract {

    public name = "twitter";

    public setup(): Promise<void> {
        return null;
    }

    public async loadCurrentPosts(): Promise<Post[]> {

        return null;
    }
}