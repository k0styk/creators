"use strict";

const tableName = 'equipment_price';

exports.up = async (knex) => Promise.all([
    knex.schema.createTable(tableName, table => {
        table
            .increments("id")
            .primary();
        table
            .integer("category_id")
            .notNullable()
        table.foreign('category_id').references('equipment_price_category.id');

        table
            .float("price", 2)
            .defaultTo(0)
            .notNullable();
        table
            .integer("equipment_id")
            .notNullable();
        table.foreign('equipment_id').references('equipment.id');
    }),
]);

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable(tableName),
    ]);
};