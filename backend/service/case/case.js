const fetch = require('node-fetch');
const ObjectId = require('mongoose').Types.ObjectId;
const ApiError = require('../../exceptions/api-error');
const CaseModel = require('../../models/cases');
const CaseType = require('../../models/seed.caseType');
const CaseServices = require('../../models/seed.services');
const CaseSpheres = require('../../models/seed.spheres');
const { serviceType } = require('../../models/helper');
const { CaseTypeDto, ServiceDto, SphereDto } = require('../../dtos/seed');
const { searchCases } = require('../aggregations');

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
      time,
    });

    return true;
  }

  async searchCases(
    { type, sphere, price, userId, fastFilter, onlyFavorites, limit, time },
    currentUserId = {}
  ) {
    const userIdQuery = userId
      ? { $match: { userId: new ObjectId(userId) } }
      : {};
    const typeQuery = type ? { $match: { caseType: new ObjectId(type) } } : {};
    const sphereQuery = sphere
      ? { $match: { sphereId: new ObjectId(sphere) } }
      : {};
    let fastFilterQuery = {},
      priceQuery = {},
      timeQuery = {};
    if (price) {
      const andArray = [];
      if (price.to) {
        andArray.push({ price: { $lte: Number(price.to) } });
      }
      if (price.from) {
        andArray.push({ price: { $gte: Number(price.from) } });
      }
      if (andArray.length) {
        priceQuery = { $match: { $and: andArray } };
      }
    }
    if (time) {
      const andArray = [];
      if (time.to) {
        andArray.push({ time: { $lte: time.to } });
      }
      if (time.from) {
        andArray.push({ time: { $gte: time.from } });
      }
      if (andArray.length) {
        timeQuery = { $match: { $and: andArray } };
      }
    }
    if (fastFilter) {
      const text = fastFilter.trim().replace(/[ ]+/g, ' ').split(' ');
      if (text.length) {
        const arr = [];
        for (let i = 0; i < text.length; i++) {
          arr.push({ description: new RegExp(text[i], 'gmi') });
          arr.push({ title: new RegExp(text[i], 'gmi') });
        }
        if (arr.length) {
          fastFilterQuery = { $match: { $or: [...arr] } };
        }
      }
    }

    const aggregations = [
      ...searchCases.aggregationQuery(limit),
      fastFilterQuery,
      userIdQuery,
      sphereQuery,
      priceQuery,
      typeQuery,
      timeQuery,
    ].filter((v) => Object.keys(v).length !== 0);
    console.dir(aggregations, { depth: null, colors: true });
    const candidate = await CaseModel.aggregate(aggregations);

    return candidate;
  }

  async getRecommendations() {
    const recommendations = await this.searchCases({ limit: 8 });

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

  async getParameters() {
    const promises = await Promise.all([CaseType.find(), CaseSpheres.find()]);
    const types = new CaseTypeDto(promises[0]);
    const spheres = new SphereDto(promises[1]);

    return {
      types: [...types.types],
      spheres: [...spheres.spheres],
    };
  }
}

module.exports = new CaseService();
