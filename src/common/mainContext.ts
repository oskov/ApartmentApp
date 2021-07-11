import {Knex} from "knex";
import {createKnexInstance} from "../db/knex";
import {FlatRepository} from "./flats";
import {CityRepository} from "./cities";

export class MainContext {

    constructor(private knexInstance: Knex) {
    }

    getKnex(): Knex {
        return this.knexInstance;
    }

    createFlatRepository(): FlatRepository {
        return new FlatRepository(this.knexInstance);
    }

    createCityRepository(): CityRepository {
        return new CityRepository(this.knexInstance);
    }

    static async create(): Promise<MainContext> {
        const knex = await createKnexInstance();
        return new MainContext(knex);
    }
}
