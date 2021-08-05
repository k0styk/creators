const formatPrice = (price, withCurrency = true) => {
    if (!price) {
        return;
    }
    const clearPrice =
        typeof price === 'string' ? price.replace(/\D+/g, '') : price;
    return `${new Intl.NumberFormat('ru-RU').format(clearPrice)}${
        !!withCurrency ? ' руб.' : ''
    }`;
};

export default formatPrice;
