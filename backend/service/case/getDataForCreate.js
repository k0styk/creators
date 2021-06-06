module.exports = {
    getDataForCreate:async ({knex}) => {
        const [types, services, spheres] = await Promise.all([
            knex("caseTypes").select(),
            knex("services").select(),
            knex("sphereTypes").select()
        ]);

        return {types, services, spheres};
    }
};
