const {serviceType} = require('../../enums');
const fetch = require('node-fetch');

key_youtube = 'AIzaSyCKzWSYT7lmS-Hs4J8ty4cPUyWtDFUtg-o';

module.exports = {
    createCase: async ({body, session, knex}) => {
        const response = {};
        const {user: {id: userId} = {}} = session;
        const {
            city,
            description,
            youtubeId,
            typeId,
            sphereId,
            title,
            mainServices = [],
            addServices = [],
            productionTime
        } = body;

        let cityId = null;
        let time = null;

        if (city) {
            [cityId] = await knex('cities')
                .insert(city)
                .onConflict('name')
                .merge()
                .returning('id');
        }

        try {
            const result = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${key_youtube}&part=contentDetails&fields=items(contentDetails(duration))`)
                .then(res => res.text());

            console.log(JSON.parse(result));

            const {contentDetails: {duration} = {}} = JSON.parse(result).items[0];
            const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
            let hours = 0, minutes = 0, seconds = 0, total;

            if (reptms.test(duration)) {
                const matches = reptms.exec(duration);
                if (matches[1]) {
                    hours = Number(matches[1]);
                }
                if (matches[2]) {
                    minutes = Number(matches[2]);
                }
                if (matches[3]) {
                    seconds = Number(matches[3]);
                }
                total = hours * 3600 + minutes * 60 + seconds;

                if (Number(total)) {
                    time = total;
                }
            }
        } catch (e) {
            console.log(e);
        }

        const [caseId] = await knex('cases')
            .insert({
                cityId,
                description,
                youtubeId,
                typeId,
                sphereId,
                title,
                userId,
                productionTime,
                time,
                created_at: new Date()
            })
            .returning('id');

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
