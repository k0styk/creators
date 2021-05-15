"use strict";
const {videoTypes, spheres, services, testUser} = require('./migrationsData/initData');

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
        table.string("name")
            .notNullable();
    }),

    knex.schema.createTable("sphereTypes", table => {
        table.increments("id")
            .primary();
        table.string("name")
            .notNullable();
    }),

    knex.schema.createTable("cities", table => {
        table.increments("id")
            .primary();
        table.string("name")
            .notNullable()
            .unique();
    }),

    knex.schema.createTable("promos", table => {
        table.increments("id")
            .primary();
        table
            .string("title")
            .notNullable(),
        table
            .string("desc"),
        table.integer("productionTime")
            .comment('Срок изготовления в днях'),
        table
            .integer("userId")
            .notNullable();
        table
            .integer("sphereId")
            .notNullable();
        table
            .string("youtubeId")
            .notNullable();
        table
            .integer("typeId")
            .notNullable();
        table
            .integer("cityId")
        table.timestamp("deleted_at");
        table.timestamps();
        table.index("id");
    }),

    knex.schema.createTable("services", table => {
        table.increments("id")
            .primary();
        table.string("name")
            .notNullable();
        table.string("tooltipLink"),
        table.string("tooltipText");
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
        table.integer("type")
            .notNullable()
            .comment("Тип услуги");
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
    }),
    knex.table('promoTypes').insert(videoTypes),
    knex.table('sphereTypes').insert(spheres),
    knex.table('services').insert(services),
    knex.table('users').insert(testUser)
]);


exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('sphereTypes'),
        knex.schema.dropTable('promoTypes'),
        knex.schema.dropTable('promosServices'),
        knex.schema.dropTable('promos'),
        knex.schema.dropTable('services'),
        knex.schema.dropTable('deals'),
        knex.schema.dropTable('users'),
        knex.schema.dropTable('cities'),
    ]);
};
