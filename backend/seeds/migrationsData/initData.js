const videoTypes = [
    {name: 'Реĸлама'},
    {name: 'Креатив'},
    {name: 'Продающий ролиĸ/презентация'},
    {name: 'Интервью'},
    {name: 'YouTube'},
    {name: 'Сторис'},
    {name: 'Анимация 2D'},
    {name: 'Анимация 3D'}
];

const spheres = [
    {name: 'Недвижимость'},
    {name: 'Промышленность'},
    {name: 'Ритейл'},
    {name: 'Медицина'},
    {name: 'Автомобили'},
    {name: 'Медиа/реĸлама'},
    {name: 'Онлайн обучение/образование'},
    {name: 'Блогинг/YouTube'},
    {name: 'Другое'}
];

const services = [
    {
        name: 'Сценарий',
        tooltipText: 'Сценарий может включать такие работы как: брифинг, написание аудиоряда для озвучки, написание видеоряда (это описание того, что будет происходить, как это будет выглядеть,  какая графика в определенный момент ролика.\nВидеоряд может быть описан как в текстовом формате, так и с помощью зарисовок, картинок и других примеров видео)'
    },
    {
        name: 'Съемĸа',
        tooltipText: 'Креатор определяет стоимость его съемок исходя из следующих параметров:\n' +
            ' ⁃ количество съемочных смен\n' +
            ' ⁃ используемое оборудование (некоторые вещи, например съемка с воздуха, технически не возможны без помощи спец оборудования, поэтому креатор обладающий такой техникой может запрашивать более высокую стоимость)\n' +
            ' ⁃ сложность съемок (снять интервью со штатива намного проще чем снимать видео на производственном объекте, например)\n' +
            ' ⁃ необходимый реквизит'
    },
    {
        name: 'Монтаж',
        tooltipText: 'Монтаж - основной процесс редактирования видео, который включает структурирование и склейку всех видео и аудио фрагментов. Длительность работы и стоимость зависят от количества материала, сложности монтажа, длительности конечного ролика.'
    },
    {
        name: 'Цветоĸорреĸция',
        tooltipText: 'Цветокоррекция - настройка яркости, контраста, цвета и других параметров итогового видео.',
        tooltipAdditionalType: 'img',
        tooltipAdditional: 'http://localhost:3003/public/service/color.gif'
    },
    {
        name: 'Графичесĸие 2D сцены',
        tooltipText: 'Графические 2D сцены - создание сцен, полностью состоящих из 2D графики',
        tooltipAdditionalType: 'img',
        tooltipAdditional: 'http://localhost:3003/public/service/2d.gif'
    },
    {
        name: 'Графичесĸие 3D сцены',
        tooltipText: 'Графические 3D сцены - создание сцен, полностью состоящих из 3D графики',
        tooltipAdditionalType: 'img',
        tooltipAdditional: 'http://localhost:3003/public/service/3d.gif'
    },
    {
        name: 'Инфографиĸа, титры',
        tooltipText: 'Инфографика, титры - графическое дополнение и оформление снятого видео материала',
        tooltipAdditionalType: 'img',
        tooltipAdditional: 'http://localhost:3003/public/service/infgr.gif'
    },
    {
        name: 'Саунддизайн',
        tooltipText: 'Саунддизайн и обработка звука - обработка звука включает в себя задачи по чистке звука от шумов, выравнивания громкости. Саунддизайн включает в себя аудио оформление графики и происходящих действий в ролике с целью придания динамики ролику, создания нужного эффекта и настроения.',
        tooltipAdditionalType: 'iframe',
        tooltipAdditional: 'jkE1cqe3GjU'
    },
    {
        name: 'Клинап',
        tooltipText: 'Клинап - избавление от ненужных элементов в отснятом видео материале.',
        tooltipAdditionalType: 'iframe',
        tooltipAdditional: 'NSPeltp1tn4'
    },
    {
        name: 'Музыĸальная ĸомпозиция',
        tooltipText: 'Музыкальная композиция - написание музыкальное композиции или покупка лицензии.'
    },
    {
        name: 'Озвучĸа',
        tooltipText: 'Озвучка - озвучка ролика диктором для фонового сопровождения или дубляжа (озвучки актеров)'

    }
];

const users = [
    {
        firstName: 'Алексей',
        lastName: 'Стен',
        password: 'password',
        phone: 8922716092,
        secondName: 'Монархов',
        type: 1,
        cityId: 1,
        email: 'email_1',
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
        email: 'email_2',
        photoPath: 'https://276709.selcdn.ru/proektoria/new/professions/2020/03/24/8fe0093bb30d6f8c31474bd0764e6ac0/2019-11-02_15-54-06.jpg'
    },
];

const cities = [
    {name: 'Тюмень', id: 7200000000000},
    {name: 'Москва', id: 7700000000000}
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

module.exports = {
    spheres,
    videoTypes,
    services,
    casesServices,
    cases,
    cities,
    users
};
