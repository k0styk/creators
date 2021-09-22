// const session = require('express-session');
// const redis = require('redis');
// const RedisStore = require('connect-redis')(session);

// const redisHost = process.env['REDIS_HOST'] || 'localhost',
//     redisPort = process.env['REDIS_PORT'] || '6379';

// const redisClient = redis.createClient(redisPort, redisHost);

// const sessionMiddleware = session({
//     proxy: true,
//     saveUninitialized: false,
//     resave: false,
//     secret: process.env['COOKIE_SECRET'],
//     cookie: {
//         httpOnly: true,
//         maxAge: 10 * 24 * 60 * 60 * 1000, // day*hour*minutes*seconds*millis
//     },
//     store: new RedisStore({
//         client: redisClient,
//         ttl: 10 * 24 * 60 * 60,
//     }),
// });

// module.exports = sessionMiddleware;
