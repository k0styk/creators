require('dotenv').config();
const mongoose = require('mongoose');
const Spheres = require('../models/seed.spheres');
const Services = require('../models/seed.services');
const CaseType = require('../models/seed.caseType');

const originPath =
  process.env['NODE_ENV'] === 'production'
    ? 'https://creators.emergent.su/public/service'
    : 'http://localhost:8000/public/service';

const data = [
  [
    {
      name: 'Сценарий',
      tooltipText:
        'Сценарий может включать такие работы как: брифинг, написание аудиоряда для озвучки, написание видеоряда (это описание того, что будет происходить, как это будет выглядеть,  какая графика в определенный момент ролика.\nВидеоряд может быть описан как в текстовом формате, так и с помощью зарисовок, картинок и других примеров видео)',
    },
    {
      name: 'Съемĸа',
      tooltipText:
        'Креатор определяет стоимость его съемок исходя из следующих параметров:\n' +
        ' ⁃ количество съемочных смен\n' +
        ' ⁃ используемое оборудование (некоторые вещи, например съемка с воздуха, технически не возможны без помощи спец оборудования, поэтому креатор обладающий такой техникой может запрашивать более высокую стоимость)\n' +
        ' ⁃ сложность съемок (снять интервью со штатива намного проще чем снимать видео на производственном объекте, например)\n' +
        ' ⁃ необходимый реквизит',
    },
    {
      name: 'Монтаж',
      tooltipText:
        'Монтаж - основной процесс редактирования видео, который включает структурирование и склейку всех видео и аудио фрагментов. Длительность работы и стоимость зависят от количества материала, сложности монтажа, длительности конечного ролика.',
    },
    {
      name: 'Цветоĸорреĸция',
      tooltipText:
        'Цветокоррекция - настройка яркости, контраста, цвета и других параметров итогового видео.',
      tooltipAdditionalType: 'img',
      tooltipAdditional: `${originPath}/color.gif`,
    },
    {
      name: 'Графичесĸие 2D сцены',
      tooltipText:
        'Графические 2D сцены - создание сцен, полностью состоящих из 2D графики',
      tooltipAdditionalType: 'img',
      tooltipAdditional: `${originPath}/2d.gif`,
    },
    {
      name: 'Графичесĸие 3D сцены',
      tooltipText:
        'Графические 3D сцены - создание сцен, полностью состоящих из 3D графики',
      tooltipAdditionalType: 'img',
      tooltipAdditional: `${originPath}/3d.gif`,
    },
    {
      name: 'Инфографиĸа, титры',
      tooltipText:
        'Инфографика, титры - графическое дополнение и оформление снятого видео материала',
      tooltipAdditionalType: 'img',
      tooltipAdditional: `${originPath}/infgr.gif`,
    },
    {
      name: 'Саунддизайн',
      tooltipText:
        'Саунддизайн и обработка звука - обработка звука включает в себя задачи по чистке звука от шумов, выравнивания громкости. Саунддизайн включает в себя аудио оформление графики и происходящих действий в ролике с целью придания динамики ролику, создания нужного эффекта и настроения.',
      tooltipAdditionalType: 'iframe',
      tooltipAdditional: 'jkE1cqe3GjU',
    },
    {
      name: 'Клинап',
      tooltipText:
        'Клинап - избавление от ненужных элементов в отснятом видео материале.',
      tooltipAdditionalType: 'iframe',
      tooltipAdditional: 'NSPeltp1tn4',
    },
    {
      name: 'Музыĸальная ĸомпозиция',
      tooltipText:
        'Музыкальная композиция - написание музыкальное композиции или покупка лицензии.',
    },
    {
      name: 'Озвучĸа',
      tooltipText:
        'Озвучка - озвучка ролика диктором для фонового сопровождения или дубляжа (озвучки актеров)',
    },
  ],
  [
    { name: 'Недвижимость' },
    { name: 'Промышленность' },
    { name: 'Ритейл' },
    { name: 'Медицина' },
    { name: 'Автомобили' },
    { name: 'Медиа/реĸлама' },
    { name: 'Онлайн обучение/образование' },
    { name: 'Блогинг/YouTube' },
    { name: 'Другое' },
  ],
  [
    { name: 'Реĸлама' },
    { name: 'Креатив' },
    { name: 'Продающий ролиĸ/презентация' },
    { name: 'Интервью' },
    { name: 'YouTube' },
    { name: 'Сторис' },
    { name: 'Анимация 2D' },
    { name: 'Анимация 3D' },
  ],
];

const models = [Services, Spheres, CaseType];

const start = async () => {
  try {
    await mongoose.connect(process.env['DB_URL'], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    for (let i = 0; i < models.length; i++) {
      await models[i].remove({});
      await models[i].insertMany(data[i]);
    }
    console.log('Seed running: OK');
    mongoose.disconnect();
  } catch (e) {
    console.log(e);
    console.log('------------------');
    console.log('Seed running: err');
  }
};

start();
