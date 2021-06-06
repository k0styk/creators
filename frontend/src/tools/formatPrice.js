const formatTime = (price) => {
    if(!price){
        return
    }
    return `${new Intl.NumberFormat('ru-RU').format(price)}  руб.`
};

export default formatTime;