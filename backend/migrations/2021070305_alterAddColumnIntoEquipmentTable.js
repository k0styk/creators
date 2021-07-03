"use strict";

const tableName = 'equipment';
const columnName = 'category_id';

exports.up = async (knex) => Promise.all([
    knex.schema.alterTable(tableName, table => {
        table
            .integer(columnName)
            .nullable();
        table.foreign(columnName).references('equipment_category.id');
    }),
]);

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropColumn(columnName),
    ]);
};