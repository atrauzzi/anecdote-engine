import {Driver} from "./Driver";
import {Target as TargetContract} from "../../Engine/Target";
import {Service as Bus} from "../../Bus/Service";
import {Post} from "../../Domain/Post";
import {Configuration} from "./Configuration";


export class Target extends Driver implements TargetContract {

    public constructor(options: Configuration, bus: Bus) {

        super(options, bus);
    }

    public async savePost(post: Post) {

        await this.connect();

        await this.save("post", post);
    }
}