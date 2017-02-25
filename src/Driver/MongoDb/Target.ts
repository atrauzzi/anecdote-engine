import {Driver} from "./Driver";
import {Target as TargetContract} from "../../Engine/Target";
import {Post} from "../../Domain/Post";
import {Configuration} from "../../Engine/Configuration";


export class Target extends Driver implements TargetContract {

    public constructor(options: Configuration, bus: IPostal) {

        super(options, bus);
    }

    public async savePost(post: Post) {

        await this.connect();

        await this.save("post", post);
    }
}