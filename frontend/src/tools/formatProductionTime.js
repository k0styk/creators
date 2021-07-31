const plural = require('plural-ru');

const formatTime = ({days, hours, minutes}) => {
    let result = '';

    if(days){
        result += `${days} ${plural(
            Number(days),
            'день',
            'дня',
            'дней'
        )}`
    }
    if(hours){
        result += `${hours} ${plural(
            Number(hours),
            'час',
            'часа',
            'часов'
        )}`
    }
    if(minutes){
        result += `${minutes} ${plural(
            Number(days),
            'минута',
            'минуты',
            'минут'
        )}`
    }
    return result
};


export default formatTime;