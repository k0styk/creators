const ObjectId = require('mongoose').Types.ObjectId;

const project1 = {
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
};

const project2 = {
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
};

const group1 = {
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
};

const project3 = {
  inFavorite: 1,
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
};

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
    aggregationQuery: (limit, userId) => [
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
      userId
        ? {
            $addFields: {
              currentUserId: new ObjectId(userId),
            },
          }
        : {},
      userId
        ? {
            $lookup: {
              from: 'users',
              localField: 'currentUserId',
              foreignField: '_id',
              as: 'currentUserArray',
            },
          }
        : {},
      {
        $addFields: {
          inFavorite: false,
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
        $project: userId
          ? {
              ...project1,
              currentUserId: 1,
              currentUserObject: { $arrayElemAt: ['$currentUserArray', 0] },
            }
          : project1,
      },
      {
        $project: userId
          ? {
              ...project2,
              currentUserId: 1,
              currentUserObject: 1,
            }
          : project2,
      },
      {
        $group: userId
          ? {
              ...group1,
              currentUserId: { $first: '$currentUserId' },
              currentUserObject: { $first: '$currentUserObject' },
            }
          : group1,
      },
      {
        $project: userId
          ? {
              ...project3,
              inFavorite: { $in: ['$_id', '$currentUserObject.favorites'] },
            }
          : project3,
      },
      limit ? { $limit: limit } : {},
    ],
    favoritesQuery: (userId) => [
      { $match: { _id: { $eq: new ObjectId(userId) } } },
      { $unwind: '$favorites' },
      {
        $lookup: {
          from: 'cases',
          localField: 'favorites',
          foreignField: '_id',
          as: 'favoriteCases',
        },
      },
      { $project: { createdAt: 0, updatedAt: 0, _id: 0 } },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$favoriteCases', 0] }, '$$ROOT'],
          },
        },
      },
      { $project: { favoriteCases: 0 } },
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
        $addFields: {
          inFavorite: true,
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
          inFavorite: 1,
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
          inFavorite: true,
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
  chats: {
    getChats: (userId, userType) => [
      {
        $match:
          userType === 1
            ? { customerId: new ObjectId(userId) }
            : { creatorId: new ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'cases',
          localField: 'caseId',
          foreignField: '_id',
          as: 'caseObject',
        },
      },
      userType === 1
        ? {
            $lookup: {
              from: 'users',
              localField: 'creatorId',
              foreignField: '_id',
              as: 'userObject',
            },
          }
        : {
            $lookup: {
              from: 'users',
              localField: 'customerId',
              foreignField: '_id',
              as: 'userObject',
            },
          },
      { $unwind: '$caseObject' },
      { $unwind: '$userObject' },
      { $sort: { updatedAt: -1 } },
      {
        $project: {
          _id: 0,
          id: '$_id',
          customerId: 1,
          creatorId: 1,
          caseId: 1,
          caseName: '$caseObject.title',
          userName: {
            $concat: ['$userObject.firstName', ' ', '$userObject.secondName'],
          },
          userPhotoPath: '$userObject.photoPath',
        },
      },
    ],
    getChatMessages: (chatId, limit = 100) => [
      // { $match: { _id: new ObjectId(chatId) } },
      // { $unwind: '$messages' },
      // { $sort: { 'messages.dateSend': -1 } },
      // { $limit: limit },
      // {
      //   $group: {
      //     _id: {
      //       id: '$_id',
      //       groupedDate: {
      //         $dateToString: {
      //           format: '%d.%m.%Y',
      //           date: '$messages.dateSend',
      //         },
      //       },
      //     },
      //     messages: {
      //       $push: '$messages',
      //     },
      //     customerId: {
      //       $first: '$customerId',
      //     },
      //     creatorId: {
      //       $first: '$creatorId',
      //     },
      //     caseId: {
      //       $first: '$caseId',
      //     },
      //     deleted: {
      //       $first: '$deleted',
      //     },
      //     createdAt: {
      //       $first: '$createdAt',
      //     },
      //     updatedAt: {
      //       $first: '$updatedAt',
      //     },
      //   },
      // },
      // {
      //   $project: {
      //     _id: '$_id.id',
      //     groupedDate: '$_id.groupedDate',
      //     // caseId: 1,
      //     // creatorId: 1,
      //     // customerId: 1,
      //     deleted: 1,
      //     messages: 1,
      //     updatedAt: 1,
      //     createdAt: 1,
      //   },
      // },
      // { $sort: { groupedDate: 1 } },
      { $match: { _id: new ObjectId(chatId) } },
      { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
      { $sort: { 'messages.dateSend': -1 } },
      { $limit: 100 },
      { $sort: { 'messages.dateSend': 1 } },
      {
        $group: {
          _id: {
            id: '$_id',
          },
          messages: {
            $push: '$messages',
          },
          deleted: {
            $first: '$deleted',
          },
          checkedServices: {
            $first: '$checkedServices',
          },
          createdAt: {
            $first: '$createdAt',
          },
          updatedAt: {
            $first: '$updatedAt',
          },
          caseId: { $first: '$caseId' },
        },
      },
      {
        $lookup: {
          from: 'cases',
          localField: 'caseId',
          foreignField: '_id',
          as: 'caseObject',
        },
      },
      { $unwind: '$caseObject' },
      {
        $project: {
          _id: '$_id.id',
          groupedDate: '$_id.groupedDate',
          deleted: 1,
          messages: 1,
          services: '$caseObject.services',
          productionTime: '$caseObject.productionTime',
          caseObject: 1,
          checkedServices: 1,
          updatedAt: 1,
          createdAt: 1,
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
        $group: {
          _id: '$_id',
          services: { $push: '$services' },
          messages: { $first: '$messages' },
          productionTime: { $first: '$productionTime' },
          deleted: {
            $first: '$deleted',
          },
          checkedServices: {
            $first: '$checkedServices',
          },
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          deleted: 1,
          messages: 1,
          services: 1,
          checkedServices: 1,
          productionTime: 1,
        },
      },
    ],
    getMessageInfoToNotify: (chatId, userType) => [
      { $match: { _id: new ObjectId(chatId) } },
      {
        $lookup: {
          from: 'cases',
          localField: 'caseId',
          foreignField: '_id',
          as: 'caseObject',
        },
      },
      userType === 1
        ? {
            $lookup: {
              from: 'users',
              localField: 'customerId',
              foreignField: '_id',
              as: 'userObject',
            },
          }
        : {
            $lookup: {
              from: 'users',
              localField: 'creatorId',
              foreignField: '_id',
              as: 'userObject',
            },
          },
      { $unwind: '$caseObject' },
      { $unwind: '$userObject' },
      {
        $project: {
          _id: 0,
          userId: userType === 1 ? '$creatorId' : '$customerId',
          caseName: '$caseObject.title',
          userName: {
            $concat: ['$userObject.firstName', ' ', '$userObject.secondName'],
          },
        },
      },
    ],
  },
};
