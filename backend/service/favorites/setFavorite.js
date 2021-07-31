module.exports = {
    setFavorite: async ({body, session, knex}) => {
        const {
            caseId,
            action
        } = body;

        const {user: {id: userId} = {}} = session;

        if (!userId) {
            return;
        }

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
