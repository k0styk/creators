const {searchCases} = require("./searchCases");
module.exports = {
    getRecommendations: async ({knex}) => {
        return searchCases({body: {limit: 8}, knex});
        //в будущем должен быть метод для получения рекомендаций, а пока не вижу смысла дублировать код на получение
    }
};
