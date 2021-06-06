const getUserSphereTypes = (knex, userId) => knex("sphereTypes")
    .distinct('sphereTypes.id')
    .pluck('name')
    .join('promos', 'promos.sphereId', 'sphereTypes.id')
    .where('promos.userId', userId);

const getUserPromos = (knex, userId) => knex("promos")
    .select()
    .where('promos.userId', userId);

const getUserCountPromos = (knex, userId) => knex("promos")
    .count()
    .first()
    .where('promos.userId', userId);

const getUser = (knex, userId, columns) => knex("users")
    .first(columns)
    .leftJoin('cities', 'cities.id', 'cityId')
    .where('users.id', userId);

module.exports = {
    getUser,
    getUserCountPromos,
    getUserPromos,
    getUserSphereTypes
};