const plural = require('plural-ru');

const getProductionTime = (minutes) => {
    let result = '';
    let time = minutes;

    if (Math.trunc(time / (24 * 60))) {
        const days = (Math.trunc(time / (24 * 60)));
        result += `${days} ${plural(
            Number(days),
            'день ',
            'дня ',
            'дней '
        )}`

        time -= days * 24 * 60;
    }

    if (Math.trunc(time / 60)) {
        const hours = (Math.trunc(time / 60));
        result += `${hours} ${plural(
            Number(hours),
            'час ',
            'часа ',
            'часов '
        )}`
        time -= hours * 60;
    }
    if (time) {
        result += `${time} ${plural(
            Number(time),
            'минута',
            'минуты',
            'минут'
        )}`
    }
    return result
};


export default getProductionTime;