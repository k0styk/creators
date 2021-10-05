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
      { $unwind: '$services' },
      {
        $lookup: {
          from: 'seed.services',
          localField: 'services.serviceId',
          foreignField: '_id',
          as: 'serviceObject',
        },
      },
      { $unwind: '$serviceObject' },
      {
        $addFields: {
          services: { $mergeObjects: ['$serviceObject', '$services'] },
        },
      },
      { $unset: ['services.__v'] },
      {
        $project: {
          serviceObject: 1,
          services: 1,
          city: 1,
          title: 1,
          userId: 1,
          sphereId: 1,
          caseType: 1,
          youtubeId: 1,
          description: 1,
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
          city: 1,
          time: 1,
          title: 1,
          userId: 1,
          sphereId: 1,
          caseType: 1,
          services: 1,
          youtubeId: 1,
          description: 1,
          productionTime: 1,
          updatedAt: 1,
          createdAt: 1,
          sphere: '$sphereObject.name',
          type: '$caseTypeObject.name',
          user: {
            id: '$userObject._id',
            firstName: '$userObject.firstName',
            photoPath: '$userObject.photoPath',
            favorites: '$userObject.favorites',
          },
        },
      },
      {
        $group: {
          _id: '$_id',
          services: { $push: '$services' },
          city: { $first: '$city' },
          title: { $first: '$title' },
          userId: { $first: '$userId' },
          sphereId: { $first: '$sphereId' },
          caseType: { $first: '$caseType' },
          youtubeId: { $first: '$youtubeId' },
          description: { $first: '$description' },
          productionTime: { $first: '$productionTime' },
          time: { $first: '$time' },
          updatedAt: { $first: '$updatedAt' },
          createdAt: { $first: '$createdAt' },
          sphere: { $first: '$sphere' },
          type: { $first: '$type' },
          user: { $first: '$user' },
        },
      },
      {
        $project: {
          inFavorite: { $in: ['$_id', '$user.favorites'] },
          id: '$_id',
          city: 1,
          title: 1,
          userId: 1,
          sphereId: 1,
          caseType: 1,
          services: 1,
          youtubeId: 1,
          description: 1,
          user: {
            id: '$user.id',
            firstName: '$user.firstName',
            photoPath: '$user.photoPath',
          },
          productionTime: 1,
          time: 1,
          updatedAt: 1,
          createdAt: 1,
          sphere: 1,
          type: 1,
          price: {
            $reduce: {
              input: {
                $filter: {
                  input: '$services',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.serviceType', 1],
                  },
                },
              },
              initialValue: 0,
              in: { $add: ['$$value', '$$this.price'] },
            },
          },
        },
      },
      limit ? { $limit: limit } : {},
    ],
  },
  getCase: {
    aggregationQuery: (caseId) => [
      { $match: { _id: ObjectId(caseId) } },
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
      { $unwind: '$services' },
      {
        $lookup: {
          from: 'seed.services',
          localField: 'services.serviceId',
          foreignField: '_id',
          as: 'serviceObject',
        },
      },
      { $unwind: '$serviceObject' },
      {
        $addFields: {
          services: { $mergeObjects: ['$serviceObject', '$services'] },
        },
      },
      { $unset: ['services.__v'] },
      {
        $project: {
          serviceObject: 1,
          services: 1,
          city: 1,
          title: 1,
          userId: 1,
          sphereId: 1,
          caseType: 1,
          youtubeId: 1,
          description: 1,
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
          city: 1,
          time: 1,
          title: 1,
          userId: 1,
          sphereId: 1,
          caseType: 1,
          services: 1,
          youtubeId: 1,
          description: 1,
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
      {
        $group: {
          _id: '$_id',
          services: { $push: '$services' },
          city: { $first: '$city' },
          title: { $first: '$title' },
          userId: { $first: '$userId' },
          sphereId: { $first: '$sphereId' },
          caseType: { $first: '$caseType' },
          youtubeId: { $first: '$youtubeId' },
          description: { $first: '$description' },
          productionTime: { $first: '$productionTime' },
          time: { $first: '$time' },
          updatedAt: { $first: '$updatedAt' },
          createdAt: { $first: '$createdAt' },
          sphere: { $first: '$sphere' },
          type: { $first: '$type' },
          user: { $first: '$user' },
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
          user: 1,
          productionTime: 1,
          time: 1,
          updatedAt: 1,
          createdAt: 1,
          sphere: 1,
          type: 1,
          price: {
            $reduce: {
              input: {
                $filter: {
                  input: '$services',
                  as: 'item',
                  cond: {
                    $eq: ['$$item.serviceType', 1],
                  },
                },
              },
              initialValue: 0,
              in: { $add: ['$$value', '$$this.price'] },
            },
          },
        },
      },
    ],
  },
};
