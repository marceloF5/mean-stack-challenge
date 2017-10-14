'use strict'

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const bodyParse = require('body-parser');

const app = express();
const route = express.Router();

//Connect DataBase
mongoose.connect('mongodb://fortunato:fortunato@ds119355.mlab.com:19355/delilverycenter');

//Load Models
const deliveryModel = require('./server/models/delivery');

//Load Routes
const deliveryRoute = require('./server/routes/delivery');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/delivery', deliveryRoute);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log(path.join(__dirname));
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//const app = require('./src/app');
const http = require('http');

const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log('API running in port:' + port));