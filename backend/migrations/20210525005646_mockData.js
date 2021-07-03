const users = [
    {
        firstName: 'Алексей',
        lastName: 'Стен',
        password: 'password',
        phone: 8922796092,
        secondName: 'Монархов',
        type: 1,
        cityId: 1,
        email: 'email',
        photoPath: 'https://antonenko-media.com/wp-content/uploads/2021/02/234fghgf-1024x683.jpg'
    },
    {
        firstName: 'Ната',
        lastName: 'Лондон',
        password: 'password',
        phone: 8922796012,
        secondName: 'Монархова',
        type: 1,
        cityId: 1,
        email: 'email2',
        photoPath: 'https://276709.selcdn.ru/proektoria/new/professions/2020/03/24/8fe0093bb30d6f8c31474bd0764e6ac0/2019-11-02_15-54-06.jpg'
    },
];

const cities = [
    {name: 'Тюмень'},
    {name: 'Москва'}
];

const cases = [
    {
        cityId: 1,
        productionTime: '2',
        sphereId: 1,
        title: 'Рекламный ролик "ПромСтройСервис"',
        typeId: 1,
        userId: 2,
        description: 'В заказ подобного видео входит 2 дня съемки: 1 день в офисе и 1 день на строительном объекте.через 5 дней после съемок вы увидите смонтированное видео, а еще через 7 уже полностью готовое с цветокоррекцией и саунддизайном.',
        youtubeId: '961Ttgo-jZI'
    },
    {
        cityId: 1,
        description: 'description',
        productionTime: '2',
        sphereId: 1,
        title: 'СВАДЕБНОЕ ВИДЕО',
        typeId: 1,
        userId: 2,
        youtubeId: '5hZgvxhZBa0'
    },
    {
        cityId: 1,
        description: 'В основном занимаюсь видео для строительных компаний уже более 3 лет.',
        productionTime: '2',
        sphereId: 1,
        title: 'Реклама строительной компании "Альфа-групп"',
        typeId: 1,
        userId: 1,
        youtubeId: 'UpR3ZDXZ_cM'
    },
    {
        cityId: 1,
        description: 'Делаю видео для строительных компаний уже более 3-х лет. Знаю все тонкости съемки на строительных объектах, а также все\n' +
            'техники безопасности, чтобы вы не угадили на штраф.',
        productionTime: '2',
        sphereId: 3,
        title: 'Рекламное видео для строительной компании',
        typeId: 4,
        userId: 1,
        youtubeId: '_TkkUerCJXE'
    },
    {
        cityId: 1,
        description: 'description',
        productionTime: '1',
        sphereId: 2,
        title: 'title',
        typeId: 2,
        userId: 2,
        youtubeId: '961Ttgo-jZI'
    }
];
const casesServices = [
    {price: 1000, caseId: 1, serviceId: 1, type: 1},
    {price: 2200, caseId: 1, serviceId: 2, type: 2},
    {price: 2070, caseId: 1, serviceId: 3, type: 1},
    {price: 8000, caseId: 1, serviceId: 4, type: 2},
    {price: 1000, caseId: 2, serviceId: 1, type: 1},
    {price: 2200, caseId: 2, serviceId: 2, type: 2},
    {price: 2070, caseId: 2, serviceId: 3, type: 1},
    {price: 8000, caseId: 2, serviceId: 4, type: 1},
    {price: 1800, caseId: 3, serviceId: 1, type: 1},
    {price: 9200, caseId: 3, serviceId: 2, type: 2},
    {price: 8070, caseId: 3, serviceId: 3, type: 2},
    {price: 2000, caseId: 3, serviceId: 4, type: 1}
];


exports.up = (knex) => Promise.all([
    knex.table('users').insert(users),
    knex.table('cases').insert(cases),
    knex.table('cities').insert(cities),
    knex.table('casesServices').insert(casesServices)
]);


exports.down = function (knex) {

};
