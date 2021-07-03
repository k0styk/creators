'use strict';

exports.up = async (knex) =>
    Promise.all([
        knex.schema.table('users', (table) => {
            table.boolean('verify_email');
            table.boolean('full_register');
            table.string('reset_token');
            table.timestamp('reset_token_exp');
            table.string('firstName').nullable().alter();
            table.string('secondName').nullable().alter();
            table.string('lastName').nullable().alter();
            table.string('phone').nullable().alter();
        }),
    ]);

exports.down = function (knex) {
    return Promise.all([
        knex.schema.table('users', (table) => {
            table.dropColumn('verify_email');
            table.dropColumn('full_register');
            table.dropColumn('reset_token');
            table.dropColumn('reset_token_exp');
            table.string('firstName').notNullable().alter();
            table.string('secondName').notNullable().alter();
            table.string('lastName').notNullable().alter();
            table.string('phone').notNullable().alter();
        }),
    ]);
};
