import { Bundle } from "protoculture";
import { AnecdoteEngineServiceProvider } from "../App/AnecdoteEngine/ServiceProvider";


export class AnecdoteBundle extends Bundle {

    public name = "anecdote";

    public get serviceProviders() {

        return [
            AnecdoteEngineServiceProvider,
        ];
    }
}
