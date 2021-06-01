const {serviceType} = require('../../enums');

module.exports = {
    createPromo: async ({body, knex}) => {
        const response = {};
        const {
            city,
            desc,
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

        const [promoId] = await knex('promos')
            .insert({
                cityId,
                desc,
                youtubeId,
                typeId,
                sphereId,
                title,
                userId: 1
            })
            .returning('id');

        console.log(promoId);


        const services = [
            ...addServices.map(({id, price}) => {
                return {
                    serviceId: id,
                    price,
                    promoId,
                    type: serviceType.ADDITIONAL
                };
            }),
            ...mainServices.map(({id, price}) => {
                return {
                    serviceId: id,
                    price,
                    promoId,
                    type: serviceType.MAIN
                };
            })
        ];

        await knex('promosServices')
            .insert(services);

        return response;
    }
};
