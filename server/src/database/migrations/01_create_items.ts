import Knex from 'knex';
// create tables
export async function up(knex: Knex) {
    // table items
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    })
}

// back down (delete)
export async function down(knex: Knex) {
    // delete table
    return knex.schema.dropTable('items');
}