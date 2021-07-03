const {equipmentPriceCategory} = require('../enums');

const rows = [
    {name: 'Рабочий день', code: equipmentPriceCategory.weekday},
    {name: 'Выходной день', code: equipmentPriceCategory.weekend},
    {name: 'Неделя', code: equipmentPriceCategory.week},
    {name: 'Месяц', code: equipmentPriceCategory.month},
];

exports.up = (knex) => Promise.all([
    knex.table('equipment_price_category').insert(rows)
]);


exports.down = function (knex) {

};