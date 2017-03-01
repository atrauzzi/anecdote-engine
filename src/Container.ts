import {Container, decorate, injectable} from "inversify";
import {Types} from "./Engine/index";
import {Service as Bus} from "./Bus/Service";
import * as marked from "marked";
import highlight from "highlight.js";


const container = new Container();

//
// Bus

decorate(injectable(), Bus);

container.bind<Bus>(Types.Bus)
    .to(Bus)
    .inSingletonScope();

//
// Marked

marked.setOptions({
    highlight: (code) => highlight
        .highlightAuto(code)
        .value
});

container.bind<MarkedStatic>(Types.Marked)
    .toFunction(marked);

//
// All done!

export {container};
