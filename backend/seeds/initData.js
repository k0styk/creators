const mock = require('./migrationsData/initData');

exports.seed = async (knex) => {
    await knex.table('services').truncate().then(() => knex.table('services').insert(mock.services));
    await knex.table('sphereTypes').truncate().then(() => knex.table('sphereTypes').insert(mock.spheres));
    await knex.table('caseTypes').truncate().then(() => knex.table('caseTypes').insert(mock.videoTypes));
    await knex.table('users').insert(mock.users),
    await knex.table('cases').insert(mock.cases),
    await knex.table('cities').insert(mock.cities),
    await knex.table('casesServices').insert(mock.casesServices);
};
