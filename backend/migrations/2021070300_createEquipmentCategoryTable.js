"use strict";

const tableName = 'equipment_category';

exports.up = async (knex) => Promise.all([
    knex.schema.createTable(tableName, table => {
        table
            .increments("id")
            .primary();
        table
            .string("name")
            .notNullable();
        table
            .integer("parent_id")
            .nullable();
        table.foreign('parent_id').references('equipment_category.id');

        table
            .string("href")
            .nullable();
    }),
]);

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable(tableName),
    ]);
};