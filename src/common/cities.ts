import {Repository} from "./repository";
import {CITY_TABLE} from "./consts";

export interface City {
    id: number
    name: string;
    enabled: boolean;
}

export class CityRepository extends Repository<City>{
    protected table = CITY_TABLE;

    async findAllEnabled(): Promise<City[]> {
        return await this.queryKnex().select().where('enabled', true);
    }
}
