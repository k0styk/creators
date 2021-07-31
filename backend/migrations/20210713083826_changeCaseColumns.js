exports.up = async (knex) => {
    await knex.schema.table('cities', (table) => {
        table
            .dropColumn('id');
    });

    return Promise.all([
        knex.schema.table('cities', (table) => {
            table
                .bigInteger('id')
                .comment('kladrId')
                .primary();
        }),
        knex.schema.alterTable('users', (table) => {
            table
                .bigInteger('cityId')
                .comment('kladrId города')
                .alter();
        }),
        knex.schema.table('cases', (table) => {
            table
                .bigInteger('cityId')
                .comment('kladrId')
                .alter();
            table
                .bigInteger('time')
                .comment('Время ролика');
        }),
    ]);
};

exports.down = async (knex) => {
    await knex.schema.table('cities', (table) => {
        table
            .dropColumn('id');
    });

    return Promise.all([
        knex.schema.table('cities', (table) => {
            table
                .increments('id')
                .primary();
        }),
        knex.schema.alterTable('users', (table) => {
            table
                .integer('cityId')
                .alter();
        }),
    ]);
};