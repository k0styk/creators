const express = require('express');
const cors = require('cors');
const app = express();
const fileUpload = require('express-fileupload');
const apiRoute = require('./routes/api.routes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));
app.use('/api', apiRoute);


app.listen(3003, function () {
    console.log('API app started');
});

module.exports = app;
