import { ServiceProvider } from "protoculture";
import { reduxSymbols } from "protoculture";
import { anecdoteSymbols } from "./index";
import { Service } from "./Service";


export class AnecdoteEngineServiceProvider extends ServiceProvider {

    public async boot() {

        this.makeInjectable(Service);
        this.bindConstructor(anecdoteSymbols.Anecdote, Service);
        this.bindConstructorParameter(anecdoteSymbols.Repository, Service, 0);
        this.bindConstructorParameter([anecdoteSymbols.Source], Service, 1);
        this.bindConstructorParameter([anecdoteSymbols.Queue], Service, 2);
        this.bindConstructorParameter([anecdoteSymbols.Target], Service, 3);
        this.bindConstructorParameter(reduxSymbols.Store, Service, 4);
    }
}
