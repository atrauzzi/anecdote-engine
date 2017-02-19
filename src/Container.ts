import inversify from "inversify";
import postal from "postal";
import {Types} from "./index";


const container = new inversify.Container();

container.bind<postal.Postal>(Types.Postal)
    .toConstantValue(postal);

inversify.decorate(inversify.injectable(), postal);

export {container};
