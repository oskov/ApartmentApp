import { Knex } from 'knex'

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('city', (tableBuilder) => {
        tableBuilder.increments();
        tableBuilder.string('name');
        tableBuilder.boolean('enabled').defaultTo(true);
    })
}

export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('city');
}
