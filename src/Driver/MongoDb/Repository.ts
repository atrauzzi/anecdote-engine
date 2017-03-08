import {Driver} from "./Driver";
import {Repository as RepositoryContract} from "../../Engine/Repository";
import {Service as Bus} from "../../Bus/Service";
import {Author} from "../../Domain/Author";
import {ScanSource} from "../../Engine/Job/ScanSource";
import {Configuration} from "./Configuration";


export class Repository extends Driver implements RepositoryContract {

    public constructor(options: Configuration, bus: Bus) {

        super(options, bus);
    }

    public async addAuthor(author: Author): Promise<any> {

        await this.collection("author")
            // ToDo: Need to open a ticket on the mongodb JIRA about this - https://jira.mongodb.org/browse/NODE
            .insertOne(JSON.parse(JSON.stringify(author)));
    }

    public async authors() {

        return await this.collection("author")
            .find<Author>()
            .toArray();
    }

    public recordScan(job: ScanSource): void {

        //console.log("ToDo: Save recording of scan: ", job);
    }
}