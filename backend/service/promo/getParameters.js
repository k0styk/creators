module.exports = {
    getParameters:async ({knex}) => {
        const [types, spheres] = await Promise.all([
            knex("promoTypes").select(),
            knex("sphereTypes").select()
        ]);

        return {types, spheres};
    }
};
