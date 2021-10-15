const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();
const { apiRoute, authRoute } = require('./routes/');
// const { session, headers } = require('./middleware');
//Setup Error Handlers -- MUST BE LAST USE DIRECTIVES
const errorMiddleware = require('./middleware/error');

const origin = process.env['ORIGIN'] || [
  'http://socket.test',
  'http://localhost:3000',
];
const compress = process.env['COMPRESSION'] === 'true';

app.enable('trust proxy');
app.use(
  cors({
    origin,
    // preflightContinue: true,
    credentials: true,
  })
);
app.use(helmet());
if (compress) {
  app.use(require('compression')());
}
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(session);
app.use(fileUpload());

//Bring in the routes
app.use('/public', express.static(__dirname + '/public'));
app.use('/auth', authRoute);
app.use('/api', apiRoute);

app.use(errorMiddleware);
// app.use(errorHandlers.notFound);
// if (process.env.NODE_ENV === 'dev') {
//     app.use(errorHandlers.developmentErrors);
// } else {
//     app.use(errorHandlers.productionErrors);
// }
// Error Handlers

module.exports = app;
