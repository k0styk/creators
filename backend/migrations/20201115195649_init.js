"use strict";

exports.up = async (knex) => Promise.all([
    knex.schema.createTable("users", table => {
        table
            .increments("id")
            .primary();
        table
            .string("firstName")
            .notNullable();
        table
            .string("secondName")
            .notNullable();
        table
            .string("lastName")
            .notNullable();
        table
            .string("about");
        table
            .integer("cityId");
        table
            .string("email")
            .notNullable()
            .unique();
        table
            .string("phone")
            .notNullable()
            .unique();
        table
            .integer("type")
            .comment('Тип пользователя - испольнитель или заказчик')
            .notNullable();
        table
            .string("photoPath");
        table
            .string("password")
            .notNullable();
        table
            .timestamp("deleted_at");
        table
            .timestamps();
    }),

    knex.schema.createTable("caseTypes", table => {
        table
            .increments("id")
            .primary();
        table
            .string("name")
            .notNullable();
    }),

    knex.schema.createTable("sphereTypes", table => {
        table
            .increments("id")
            .primary();
        table
            .string("name")
            .notNullable();
    }),

    knex.schema.createTable("cities", table => {
        table
            .increments("id")
            .primary();
        table
            .string("name")
            .notNullable()
            .unique();
    }),

    knex.schema.createTable("cases", table => {
        table
            .increments("id")
            .primary();
        table
            .string("title")
            .notNullable();
        table
            .string("description");
        table.integer("productionTime")
            .comment('Срок изготовления в минутах');
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
            .integer("cityId");
        table
            .timestamp("deleted_at");
        table
            .timestamps();
        table
            .specificType('tsvector', 'tsvector');
        table
            .index("id");
    }),

    knex.schema.createTable("services", table => {
        table
            .increments("id")
            .primary();
        table
            .string("name")
            .notNullable();
        table
            .text("tooltipText"),
        table
            .string("tooltipAdditionalType");
        table
            .string("tooltipAdditional");
    }),

    knex.schema.createTable("casesServices", table => {
        table
            .increments("id")
            .primary();
        table
            .integer("caseId")
            .notNullable()
            .comment("Идентификатор видео");
        table
            .integer("serviceId")
            .notNullable()
            .comment("Идентификатор услуги");
        table
            .integer("type")
            .notNullable()
            .comment("Тип услуги(основная или доп)");
        table
            .bigInteger("price")
            .notNullable()
            .comment("Стоимость");
        table
            .index("caseId");
    }),

    knex.schema.createTable("deals", table => {
        table
            .increments("id")
            .primary();
        table
            .integer("clientId")
            .notNullable();
        table
            .integer("creatorId")
            .notNullable();
        table
            .integer("status")
            .notNullable();
        table.index("clientId");
    }),
    knex.raw(`
    CREATE INDEX ON "cases" USING gin("tsvector");
    CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
    ON cases FOR EACH ROW EXECUTE PROCEDURE
    tsvector_update_trigger(tsvector, 'pg_catalog.russian', title, description);
  `)
]);


exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('sphereTypes'),
        knex.schema.dropTable('caseTypes'),
        knex.schema.dropTable('casesServices'),
        knex.schema.dropTable('cases'),
        knex.schema.dropTable('services'),
        knex.schema.dropTable('deals'),
        knex.schema.dropTable('users'),
        knex.schema.dropTable('cities'),
    ]);
};
