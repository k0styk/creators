"use strict";

exports.up = async (knex) => Promise.all([
    knex.schema.createTable("users", table => {
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
    }),

    knex.schema.createTable("promoTypes", table => {
        table.increments("id")
            .primary();
        table.integer("name")
            .notNullable();
    }),

    knex.schema.createTable("sphereTypes", table => {
        table.increments("id")
            .primary();
        table.integer("name")
            .notNullable();
    }),

    knex.schema.createTable("promos", table => {
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
        table
            .string("link")
            .notNullable();
        table
            .integer("typeId")
            .notNullable()
        table.timestamp("deleted_at");
        table.timestamps();
        table.index("id");
    }),

    knex.schema.createTable("videoTypes", table => {
        table.increments("id")
            .primary();
        table.integer("name")
            .notNullable();
    }),

    knex.schema.createTable("services", table => {
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
    }),

    knex.schema.createTable("promosServices", table => {
        table
            .increments("id")
            .primary();
        table.integer("promoId")
            .notNullable()
            .comment("Идентификатор видео");
        table.integer("serviceId")
            .notNullable()
            .comment("Идентификатор услуги");
        table
            .bigInteger("price")
            .notNullable()
            .comment("Стоимость");
        table.index("promoId");
    }),

    knex.schema.createTable("deals", table => {
        table.increments("id")
            .primary();
        table.integer("clientId")
            .notNullable();
        table.integer("implementerId")
            .notNullable();
        table.integer("status")
            .notNullable();
        table.index("clientId");
    })
]);


exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('promosServices'),
        knex.schema.dropTable('promos'),
        knex.schema.dropTable('services'),
        knex.schema.dropTable('deals'),
        knex.schema.dropTable('users'),
    ]);
};
