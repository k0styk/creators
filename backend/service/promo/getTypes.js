module.exports = {
    getPromoTypes: async ({knex}) => {
        return knex("promoTypes").select();
    }
};
