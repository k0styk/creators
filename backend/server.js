const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const auth = require('./auth');

const apiRoute = require('./routes/api.routes');
const authRoute = require('./routes/auth.routes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors());

app.use('/auth/', authRoute);
app.use('/api/', apiRoute);

//проверять авторизацию нужно только на определенных роутах
// app.use('/api/', auth.verifyToken, apiRoute);


app.listen(3001, function () {
    console.log('API app started');
});

module.exports = app;
