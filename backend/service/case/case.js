const ApiError = require('../../exceptions/api-error');
const CaseModel = require('../../models/cases');
const key_youtube = 'AIzaSyCKzWSYT7lmS-Hs4J8ty4cPUyWtDFUtg-o';

class CaseService {
  async createCase(
    {
      city, // { name, id }
      desc: description,
      youtubeId,
      typeId,
      sphereId,
      title,
      mainServices = [],
      addServices = [],
      productionTime,
    },
    { id: userId }
  ) {
    // let cityId = null;
    let time = null;

    try {
      const result = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${key_youtube}&part=contentDetails&fields=items(contentDetails(duration))`
      ).then((res) => res.text());

      console.log(JSON.parse(result));

      const { contentDetails: { duration } = {} } = JSON.parse(result).items[0];
      const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
      let hours = 0,
        minutes = 0,
        seconds = 0,
        total;

      if (reptms.test(duration)) {
        const matches = reptms.exec(duration);
        if (matches[1]) {
          hours = Number(matches[1]);
        }
        if (matches[2]) {
          minutes = Number(matches[2]);
        }
        if (matches[3]) {
          seconds = Number(matches[3]);
        }
        total = hours * 3600 + minutes * 60 + seconds;

        if (Number(total)) {
          time = total;
        }
      }
    } catch (e) {
      throw e;
    }
    const services = [
      ...addServices.map(({ id, price }) => {
        return {
          serviceId: id,
          price,
          caseId,
          type: serviceType.ADDITIONAL,
        };
      }),
      ...mainServices.map(({ id, price }) => {
        return {
          serviceId: id,
          price,
          caseId,
          type: serviceType.MAIN,
        };
      }),
    ];

    const Case = await CaseModel.create({
      title,
      youtubeId,
      description,
      productionTime,
      caseType: typeId,
      city,
      sphere: 'TEST', // need to take sphere
      services,
    });
    console.log(Case);

    return true;

    // const [caseId] = await knex('cases')
    //   .insert({
    //     cityId,
    //     description,
    //     youtubeId,
    //     typeId,
    //     sphereId,
    //     title,
    //     userId,
    //     productionTime,
    //     time,
    //     created_at: new Date(),
    //   })
    //   .returning('id');

    // const services = [
    //   ...addServices.map(({ id, price }) => {
    //     return {
    //       serviceId: id,
    //       price,
    //       caseId,
    //       type: serviceType.ADDITIONAL,
    //     };
    //   }),
    //   ...mainServices.map(({ id, price }) => {
    //     return {
    //       serviceId: id,
    //       price,
    //       caseId,
    //       type: serviceType.MAIN,
    //     };
    //   }),
    // ];

    // await knex('casesServices').insert(services);

    // return response;
  }

  async searchCases(
    { type, sphere, price, userId, fastFilter, onlyFavorites, limit, time },
    { id: currentUserId }
  ) {
    // const case = await CaseModel.find({});
    const candidate = await CaseModel.find(query, {
      _id: 1,
      title: 1,
      youtubeId: 1,
      sphere: 1,
      caseType: 1,
      created_at: 1,
    }).limit(limit);
    console.log(candidate);
    return true;
  }
}

module.exports = new CaseService();
