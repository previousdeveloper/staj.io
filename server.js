var express = require('express');
var mongoose = require('mongoose');
var config = require('./app/config/dbconfig');
var winston = require('winston');
var bodyParser = require('body-parser');

var app = express();

winston.add(winston.transports.File, {filename: 'loggerfile.log'});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(config.app.dbURL, {server: {keepAlive: 1, auto_reconnect: true}}, function (error) {
    if (error) {
        console.log(error);
    }
});

require('./app/controller/companyctrl')(app);

module.exports = app;
