module.exports = {
    getPromoSpheres: async ({knex}) => {
        return knex("sphereTypes").select();
    }
};
