import {Target as TargetContract} from "../../Target";


export class Target implements TargetContract {

    get name() {
        return "azure tables";
    }

    public setup(): Promise<void> {
        return null;
    }
}