import {Container, decorate, injectable} from "inversify";
import {Service as Bus} from "./Bus/Service";
import {Types} from "./Engine/index";


const container = new Container();

decorate(injectable(), Bus);

container.bind<Bus>(Types.Bus)
    .to(Bus)
    .inSingletonScope();

export {container};
