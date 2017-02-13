import {Target as TargetContract} from "../../Engine/Target";
import {Author} from "../../Domain/Author";


export class Target implements TargetContract {

    name: string;

    public async setup() {

        return undefined;
    }

    public async close() {

        return null;
    }
}