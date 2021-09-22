'use strict';

const dialogs = 'dialogs';
const messages = 'messages';

exports.up = async (knex) =>
    Promise.all([
        knex.schema.createTable(dialogs, (table) => {
            table.bigIncrements('id').primary();
            table.bigInteger('case_id').notNullable();
            table.integer('customer_id').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable(messages, (table) => {
            table.increments('id').primary();
            table.bigInteger('dialog_id').notNullable();
            table.integer('sender_id').notNullable();
            table.string('text').notNullable();
            table.timestamp('send_date').notNullable().defaultTo(knex.fn.now());
            table.timestamp('read_timestamp');
        }),
    ]);

exports.down = async (knex) =>
    Promise.all([
        knex.schema.dropTableIfExists(dialogs),
        knex.schema.dropTableIfExists(messages),
    ]);
