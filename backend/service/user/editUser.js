module.exports = {
    editUser: async ({body, session, knex}) => {
        const {firstName, about, lastName, secondName, photoPath, city} = body;
        const {user: {id} = {}} = session;
        try {
            await Promise.all([
                knex("users")
                    .update({
                        firstName,
                        about,
                        lastName,
                        secondName,
                        photoPath,
                        cityId: city && Number(city.id) || null
                    })
                    .where('users.id', id),
                knex("cities")
                    .insert(city)
                    .onConflict('id')
                    .ignore()
            ]);
            return {status: 200};
        } catch (error) {
            console.log(error);
            return error;
        }
    }
};
