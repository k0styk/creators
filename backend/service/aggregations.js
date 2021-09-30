const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
  getPersonalPage: {
    sphereAggregation: (userId) => [
      { $match: { userId: new ObjectId(userId) } },
      {
        $lookup: {
          from: 'seed.spheres',
          localField: 'sphereId',
          foreignField: '_id',
          as: 'spheres',
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$spheres', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { name: 1 } },
      { $group: { _id: '$name' } },
    ],
    priceAggregation: (userId) => [
      { $match: { userId: new ObjectId(userId) } },
      {
        $project: {
          userId: 1,
          services: {
            $filter: {
              input: '$services',
              as: 'item',
              cond: { $eq: ['$$item.serviceType', 1] },
            },
          },
        },
      },
      {
        $project: {
          userId: 1,
          Prices: { $sum: '$services.price' },
        },
      },
      {
        $group: {
          _id: '$userId',
          sumPrices: { $sum: '$Prices' },
        },
      },
    ],
  },
  searchCases: {
    aggregationQuery: (limit) => [
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
          city: 1,
          title: 1,
          userId: 1,
          sphereId: 1,
          caseType: 1,
          youtubeId: 1,
          description: 1,
          services: {
            $filter: {
              input: '$services',
              as: 'item',
              cond: { $eq: ['$$item.serviceType', 1] },
            },
          },
          productionTime: 1,
          time: 1,
          updatedAt: 1,
          createdAt: 1,
          sphereObject: { $arrayElemAt: ['$sphereArray', 0] },
          caseTypeObject: { $arrayElemAt: ['$caseTypeArray', 0] },
          userObject: { $arrayElemAt: ['$usersArray', 0] },
        },
      },
      {
        $project: {
          id: '$_id',
          city: 1,
          title: 1,
          userId: 1,
          sphereId: 1,
          caseType: 1,
          services: 1,
          youtubeId: 1,
          description: 1,
          price: {
            $reduce: {
              input: '$services',
              initialValue: 0,
              in: { $add: ['$$value', '$$this.price'] },
            },
          },
          productionTime: 1,
          time: 1,
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
    ],
  },
};
