"use strict";

const tableName = 'equipment_price_category';

exports.up = async (knex) => Promise.all([
    knex.schema.createTable(tableName, table => {
        table
            .increments("id")
            .primary();
        table
            .string("name")
            .notNullable();
        table
            .integer("code")
            .notNullable();
    }),
]);

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable(tableName),
    ]);
};