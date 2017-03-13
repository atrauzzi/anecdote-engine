import "reflect-metadata";
import * as dotenv from "dotenv";


//
// Environment
export const manifest = require(__dirname + "/../package.json");
export const environment = (dotenv.config() as any).parsed;
export {container} from "./Container";
