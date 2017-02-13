import {Source as SourceContract} from "../../Engine/Source";
import {Post} from "../../Domain/Post";


export class Source implements SourceContract {

    public name = "github";

    public setup(): Promise<void> {

        return null;
    }

    public async close() {

        return null;
    }

    public async loadCurrentPosts(): Promise<Post[]> {
        
        return null;
    }
}