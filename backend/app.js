const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const app = express();
const { apiRoute, authRoute } = require('./routes/');
const { session, headers } = require('./middleware');
//Setup Error Handlers -- MUST BE LAST USE DIRECTIVES
const errorHandlers = require('./handlers/errorHandlers');

const origin = process.env['ORIGIN']?.split(' ') || [
    'http://socket.test',
    'http://localhost:3000',
];
const compress = process.env['COMPRESSION'] === 'true';

app.enable('trust proxy');
app.use(headers);
app.use(
    cors({
        origin,
        preflightContinue: true,
        credentials: true,
    })
);
app.use(helmet());
if (compress) {
    const compression = require('compression');
    app.use(compression());
}
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session);
app.use(fileUpload());

//Bring in the routes
app.use('/auth', authRoute);
app.use('/api', apiRoute);

app.use(errorHandlers.notFound);
if (process.env.NODE_ENV === 'dev') {
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}
// Error Handlers

module.exports = app;
