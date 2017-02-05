import {Target as TargetContract} from "../../Engine/Target";
import {Author} from "../../Domain/Author";


export class Target implements TargetContract {

    name: string;

    setup(): Promise<void> {
        return undefined;
    }
}