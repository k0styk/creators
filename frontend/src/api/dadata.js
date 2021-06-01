import axios from "axios";

const token = "518f96d435704b748e40b3f6a0aa18efea327334";

const api = axios.create({
    responseType: "json",
    headers: {
        'Accept': 'application/json ',
        "Content-Type": "application/json",
        "Authorization": "Token " + token,
    }
});

const getAddress = async (query) => {
    let cities = [];
    try {
        const {data: {suggestions}} = await api.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
            JSON.stringify({
                query,
                "locations": [
                    {
                        "country": "Россия"
                    }
                ],
                "from_bound": {"value": "city"},
                "to_bound": {"value": "city"},
            }));

        cities = suggestions.map(({value, data}) =>
        {
            return {
                label: value,
                id: data.city_kladr_id
            }
        });

    } catch (_) {
    }
    return cities;
}


export default getAddress;
