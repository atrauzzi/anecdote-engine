import {Source as SourceContract} from "../Engine/Source";


export class Source implements SourceContract {

    get name() {
        return "twitter";
    }

}