"use strict";

exports.up = async (knex) => {
    await knex.schema.createTable("users", table => {
        table.increments("id")
            .primary();
        table.string("firstName")
            .notNullable();
        table.string("secondName")
            .notNullable();
        table.string("lastName")
            .notNullable();
        table.string("about");
        table.integer("cityId");
        table.string("email")
            .notNullable()
            .unique();
        table.string("phone")
            .notNullable()
            .unique();
        table.integer("type")
            .comment('Тип пользователя - испольнитель или заказчик')
            .notNullable();
        table.string("photoPath");
        table.string("password")
            .notNullable();
        table.timestamp("deleted_at");
        table.timestamps();
    });
    await knex.schema.createTable("promos", table => {
        table.increments("id")
            .primary();
        table.string("name")
            .notNullable();
        table.integer("productionTime")
            .comment('Срок изготовления в днях')
            .notNullable();
        table
            .integer("userId")
            .notNullable()
            .references('id')
            .inTable('users');
        table
            .string("videoLink")
            .notNullable();
        table.timestamp("deleted_at");
        table.timestamps();
        table.index("id");
    });
    await knex.schema.createTable("services", table => {
        table.increments("id")
            .primary();
        table.integer("serviceId")
            .notNullable();
        table.string("name")
            .notNullable();
        table.string("tooltipLink")
            .notNullable();
        table.string("tooltipText")
            .notNullable();
    });
    await knex.schema.createTable("promosServices", table => {
        table
            .increments("id")
            .primary();
        table.integer("promoId")
            .notNullable()
            .references('id')
            .inTable('promos')
            .comment("Идентификатор видео");
        table.integer("serviceId")
            .notNullable()
            .references('id')
            .inTable('services')
            .comment("Идентификатор услуги");
        table
            .bigInteger("price")
            .notNullable()
            .comment("Стоимость");
        table.index("promoId");
    });
    await knex.schema.createTable("deals", table => {
        table.increments("id")
            .primary();
        table.integer("clientId")
            .notNullable();
        table.integer("implementerId")
            .notNullable();
        table.integer("status")
            .notNullable();
        table.index("clientId");
    });
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('users'),
        knex.schema.dropTable('promos'),
        knex.schema.dropTable('promosServices'),
        knex.schema.dropTable('services'),
        knex.schema.dropTable('deals'),
    ]);
};
