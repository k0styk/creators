const fetch = require('node-fetch');
const ObjectId = require('mongoose').Types.ObjectId;
const ApiError = require('../../exceptions/api-error');
const CaseModel = require('../../models/cases');
const CaseType = require('../../models/seed.caseType');
const CaseServices = require('../../models/seed.services');
const CaseSpheres = require('../../models/seed.spheres');
const { CaseTypeDto, ServiceDto, SphereDto } = require('../../dtos/seed');
const { serviceType } = require('../../models/helper');
const key_youtube = 'AIzaSyCKzWSYT7lmS-Hs4J8ty4cPUyWtDFUtg-o';

class CaseService {
  async createCase(
    {
      city,
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
    let time = null;

    try {
      const result = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&key=${key_youtube}&part=contentDetails&fields=items(contentDetails(duration))`
      ).then((res) => res.text());

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
      throw ApiError.BadRequest(e.message);
    }

    const services = [
      ...addServices.map(({ id, price }) => {
        return {
          serviceId: id,
          price,
          serviceType: serviceType.ADDITIONAL,
        };
      }),
      ...mainServices.map(({ id, price }) => {
        return {
          serviceId: id,
          price,
          serviceType: serviceType.MAIN,
        };
      }),
    ];

    await CaseModel.create({
      userId,
      title,
      youtubeId,
      description,
      productionTime,
      caseType: typeId,
      city,
      sphereId,
      services,
    });

    return true;
  }

  async searchCases(
    { type, sphere, price, userId, fastFilter, onlyFavorites, limit, time },
    currentUserId = ''
  ) {
    const userIdQuery = userId
      ? { $match: { userId: new ObjectId(userId) } }
      : {};
    const aggregationQuery = [
      {
        $lookup: {
          from: 'seed.spheres',
          localField: 'sphereId',
          foreignField: '_id',
          as: 'sphereArray',
        },
      },
      {
        $lookup: {
          from: 'seed.case.types',
          localField: 'caseType',
          foreignField: '_id',
          as: 'caseTypeArray',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'usersArray',
        },
      },
      {
        $project: {
          title: 1,
          userId: 1,
          sphereId: 1,
          youtubeId: 1,
          caseType: 1,
          description: 1,
          city: 1,
          services: 1,
          productionTime: 1,
          updatedAt: 1,
          createdAt: 1,
          sphereObject: { $arrayElemAt: ['$sphereArray', 0] },
          caseTypeObject: { $arrayElemAt: ['$caseTypeArray', 0] },
          userObject: { $arrayElemAt: ['$usersArray', 0] },
        },
      },
      {
        $project: {
          title: 1,
          youtubeId: 1,
          description: 1,
          city: 1,
          services: 1,
          productionTime: 1,
          updatedAt: 1,
          createdAt: 1,
          sphere: '$sphereObject.name',
          type: '$caseTypeObject.name',
          user: {
            id: '$userObject._id',
            firstName: '$userObject.firstName',
            photoPath: '$userObject.photoPath',
          },
        },
      },
      limit ? { $limit: limit } : {},
    ];
    // console.log(aggregationQuery);
    // const case = await CaseModel.find({});
    /*
    query, {
      _id: 1,
      title: 1,
      youtubeId: 1,
      sphere: 1,
      caseType: 1,
      created_at: 1,
    }
    */
    // let candidate;
    // if (limit) {

    // } else {
    //   candidate = await CaseModel.aggregate([userIdQuery, ...aggregationQuery]);
    // }
    const aggregations = [userIdQuery, ...aggregationQuery].filter(
      (v) => Object.keys(v).length !== 0
    );
    console.log(aggregations);
    const candidate = await CaseModel.aggregate(aggregations);

    return candidate;
  }

  async getRecommendations() {
    const recommendations = await this.searchCases({ limit: 2 });

    return recommendations;
  }

  async getDataForCreateCases() {
    const promises = await Promise.all([
      CaseType.find(),
      CaseServices.find(),
      CaseSpheres.find(),
    ]);
    const types = new CaseTypeDto(promises[0]);
    const services = new ServiceDto(promises[1]);
    const spheres = new SphereDto(promises[2]);

    return {
      types: [...types.types],
      services: [...services.services],
      spheres: [...spheres.spheres],
    };
  }
}

module.exports = new CaseService();
