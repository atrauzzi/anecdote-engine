import {Source as SourceContract} from "../../Engine/Source";
import {Post} from "../../Domain/Post";
import {ScanSource} from "../../Engine/Job/ScanSource";


export class Source implements SourceContract {

    public name = "twitter";

    public setup(): Promise<void> {

        return null;
    }

    public async connect() {

        return null;
    }

    public async close() {

        return null;
    }

    public async loadCurrentPosts(): Promise<Post[]> {

        return null;
    }

    public scan(job: ScanSource): Promise<any> {
        throw new Error('Method not implemented.');
    }
}