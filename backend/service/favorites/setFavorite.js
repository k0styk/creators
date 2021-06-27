
module.exports = {
    setFavorite: async ({body, knex}) => {
        const {
            caseId,
            action
        } = body;

        const userId = 1;

        if (action) {
            await knex('favorites')
                .insert({userId, caseId});
        } else
            await knex('favorites')
                .del()
                .where('userId', userId)
                .where('caseId', caseId);
        return;
    }
};
