import {Container, decorate, injectable} from "inversify";
import * as postal from "postal";
import {Types} from "./Engine/index";


const container = new Container();

container.bind<IPostal>(Types.Postal)
    .toConstantValue(postal);

export {container};
