module.exports = {
    getRecommendations: async ({knex}) => {
        const promos = await knex("promos").select([
            'title',
            'firstName',
            'promos.created_at as createdAt',
            'youtubeId',
            'photoPath'
        ])
            .sum('price as price')
            .leftJoin('users', 'userId', 'users.id')
            .leftJoin('promosServices', 'promos.id', 'promoId')
            .groupBy(['promoId','promos.id', 'firstName', 'photoPath']);
        //переделать сумму в подзапрос, чтобы групбай убрать
        return promos;
    }
};
