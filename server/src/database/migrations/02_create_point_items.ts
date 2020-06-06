import Knex from 'knex';
// create tables
export async function up(knex: Knex) {
    // table relationship point_items
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary();
        
        table.integer('point_id')
        .notNullable()
        .references('id')
        .inTable('point');

        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items');
    })
}

// back down (delete)
export async function down(knex: Knex) {
    // delete table
    return knex.schema.dropTable('point_items');
}