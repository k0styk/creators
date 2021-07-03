const {videoTypes, spheres, services} = require('./migrationsData/initData');

exports.seed = async (knex) => {
    await knex.table('services').truncate().then(() => knex.table('services').insert(services));
    await knex.table('sphereTypes').truncate().then(() => knex.table('sphereTypes').insert(spheres));
    await knex.table('caseTypes').truncate().then(() => knex.table('caseTypes').insert(videoTypes));
};
