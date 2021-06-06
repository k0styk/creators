const {serviceType} = require('../../enums');

module.exports = {
    createCase: async ({body, knex}) => {
        const response = {};
        const {
            city,
            description,
            youtubeId,
            typeId,
            sphereId,
            title,
            mainServices = [],
            addServices = [],
        } = body;

        let cityId = null;

        if (city) {
            [cityId] = await knex('cities')
                .insert({name: city})
                .onConflict('name')
                .merge()
                .returning('id');
        }

        const [caseId] = await knex('cases')
            .insert({
                cityId,
                description,
                youtubeId,
                typeId,
                sphereId,
                title,
                userId: 1
            })
            .returning('id');

        console.log(caseId);


        const services = [
            ...addServices.map(({id, price}) => {
                return {
                    serviceId: id,
                    price,
                    caseId,
                    type: serviceType.ADDITIONAL
                };
            }),
            ...mainServices.map(({id, price}) => {
                return {
                    serviceId: id,
                    price,
                    caseId,
                    type: serviceType.MAIN
                };
            })
        ];

        await knex('casesServices')
            .insert(services);

        return response;
    }
};
