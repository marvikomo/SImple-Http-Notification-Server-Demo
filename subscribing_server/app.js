"use strict"
//Required Modules
require('dotenv').config();
process.env.TZ = 'Africa/Lagos'

const express = require('express');
const app = express();
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const Routes = require('./routes/');
const { sendResponse } = require('./helpers/ResponseHelper');
const RateLimiter = require('./middlewares/RateLimiter');
const path = require('path');


// MiddleWares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=> {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(cors());
app.options('*', cors());

app.use(helmet());
app.use(compression());


//connection to routes
app.get('/', (req, res) => {
    sendResponse(res, 200);
});
app.use('/',RateLimiter.regular);
app.use('/subscribe', Routes.indexRoutes);


// Handle 404
app.use(function (req, res) {
    sendResponse(res, 404);
})

//Handle Server Error
app.use(function (error, req, res, next) {
    console.log(error)
    sendResponse(res, 500, error);
});

module.exports = app

