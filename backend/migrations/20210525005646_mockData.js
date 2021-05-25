const testUser = {
    firstName: 'firstName',
    lastName: 'lastName',
    password: 'password',
    phone: 8922796092,
    secondName: 'secondName',
    type: 1,
    cityId: 1,
    email: 'email'
};

const promos = [
    {
        cityId: 1,
        desc: 'desc',
        productionTime: '2',
        sphereId: 1,
        title: 'title',
        typeId: 1,
        userId: 1,
        youtubeId: '961Ttgo-jZI'
    },
    {
        cityId: 1,
        desc: 'desc',
        productionTime: '2',
        sphereId: 1,
        title: 'title',
        typeId: 1,
        userId: 1,
        youtubeId: '961Ttgo-jZI'
    },
    {
        cityId: 1,
        desc: 'desc',
        productionTime: '2',
        sphereId: 1,
        title: 'title',
        typeId: 1,
        userId: 1,
        youtubeId: '961Ttgo-jZI'
    },
    {
        cityId: 1,
        desc: 'desc',
        productionTime: '2',
        sphereId: 3,
        title: 'title',
        typeId: 4,
        userId: 1,
        youtubeId: '961Ttgo-jZI'
    },
    {
        cityId: 1,
        desc: 'desc',
        productionTime: '1',
        sphereId: 2,
        title: 'title',
        typeId: 2,
        userId: 1,
        youtubeId: '961Ttgo-jZI'
    }];


exports.up = (knex) => Promise.all([
    knex.table('users').insert(testUser),
    knex.table('promos').insert(promos)
]);


exports.down = function (knex) {

};
