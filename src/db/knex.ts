import knex, {Knex} from "knex";
import * as v1 from './migrations/v1_init';
import * as v2 from './migrations/v2_add_city';
import * as v3 from './migrations/v3_add_base_cities';

export async function createKnexInstance(): Promise<Knex> {
    const instance = knex({
        client: "pg",
        connection: {
            host: 'localhost',
            port: 7001,
            user: 'postgres_apartment',
            password: 'postgres_apartment',
            database: 'postgres_apartment'
        },
        pool: {
            min: 1,
            max: 4,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "dist/db/migrations/",
        },
    });
    await instance.migrate.latest();
    return instance;
}
