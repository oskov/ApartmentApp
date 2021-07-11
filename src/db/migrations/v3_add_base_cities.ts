import { Knex } from 'knex'
import {City} from "../../common/cities";

export async function up(knex: Knex): Promise<any> {
    await knex<City>('city').insert([
        {name: 'riga'},
        {name: 'riga-region'},
        {name: 'jelgava-and-reg'},
        {name: 'jurmala'}
    ]);
}

export async function down(knex: Knex): Promise<any> {
    return;
}
