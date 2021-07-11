import {Knex} from 'knex'

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('flat', tableBuilder => {
        tableBuilder.increments('id').primary();
        tableBuilder.integer('idExternal').unique();
        tableBuilder.string('text', 255);
        tableBuilder.string('city', 50);
        tableBuilder.string('district', 100);
        tableBuilder.string('street', 100);
        tableBuilder.integer('rooms').unsigned();
        tableBuilder.integer('apartmentArea').unsigned();
        tableBuilder.string('floor', 50);
        tableBuilder.string('houseType', 50);
        tableBuilder.integer('price').unsigned();
        tableBuilder.string('adType', 10);
        tableBuilder.string('url', 255);
        tableBuilder.dateTime('addedDt');
    });
}

export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('flat');
}
