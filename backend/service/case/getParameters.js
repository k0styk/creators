module.exports = {
    getParameters: async ({ knex }) => {
        const [types, spheres] = await Promise.all([
            knex('caseTypes').select(),
            knex('sphereTypes').select(),
        ]);

        return { types, spheres };
    },
};
