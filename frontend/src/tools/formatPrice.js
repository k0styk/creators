const formatTime = (price) => {

    return new Intl.NumberFormat('ru-RU').format(price)
};

export default formatTime;