"use strict";

const tableName = 'equipment';

exports.up = async (knex) => Promise.all([
    knex.schema.createTable(tableName, table => {
        table
            .increments("id")
            .primary();
        table
            .string("name")
            .nullable();
        table
            .string("description")
            .nullable();
        table
            .string("href_img")
            .nullable();
        table
            .string("href")
            .nullable();
        table
            .integer("type")
            .nullable();
    }),
]);

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable(tableName),
    ]);
};