import {Knex} from "knex";
import {Repository} from "./repository";
import {FLAT_TABLE} from "./consts";
import {AdType, Flat} from "ss-lv-apartment-crawler";

export interface DbFlat {
    id?: number
    idExternal: number;
    text: string;
    city: string;
    district: string;
    street: string;
    rooms: number;
    apartmentArea: number;
    floor: string;
    houseType: string;
    price: number;
    adType: AdType;
    url: string;
    addedDt: string
}

export function flatToDbFlat(flat: Flat): DbFlat {
    return {
        idExternal: flat.id,
        adType: flat.adType,
        apartmentArea: flat.apartmentArea,
        city: flat.city,
        district: flat.district,
        floor: flat.floor,
        houseType: flat.houseType,
        price: flat.price,
        rooms: isNaN(flat.rooms) ? 0 : flat.rooms,
        street: flat.street ?? '',
        text: flat.title,
        url: flat.url,
        addedDt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
}

export class FlatRepository extends Repository<DbFlat>{
    protected table = FLAT_TABLE;

    addFlats(flats: Flat[]) {
        const dbFlats = flats.map(flat => flatToDbFlat(flat));
        return this.add(dbFlats);
    }

    async add(flats: DbFlat | DbFlat[]) {
        return this.queryKnex().insert(flats).onConflict('idExternal').ignore();
    }
}
