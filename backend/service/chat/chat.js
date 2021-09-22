module.exports = {
    createChat: async ({ body, session, knex }) => {
        const { caseId, customerId, userType } = body;
        const { user: { id } = {} } = session;

        console.log(body);
        console.log(session);
        try {
            if (userType === 1) {
                //
            } else {
                await Promise.all([
                    knex('dialogs')
                        .insert({
                            case_id: caseId,
                            customer_id: customerId,
                        })
                        .onConflict('id')
                        .ignore(),
                ]);
                return { status: 200 };
            }
            return { status: 500 };
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};
