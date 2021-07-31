const {searchCases} = require("./searchCases");
module.exports = {
    getRecommendations: async ({knex, session}) => {
        return searchCases({body: {limit: 8}, session, knex});
        //в будущем должен быть метод для получения рекомендаций, а пока не вижу смысла дублировать код на получение
    }
};
