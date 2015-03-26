var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var config = require('./app/config/dbconfig');
var winston = require('winston');


var app = express();

winston.add(winston.transports.File, {filename: 'loggerfile.log'});

var winston = require('winston');

mongoose.connect(config.app.dbURL, {server: {keepAlive: 1, auto_reconnect: true}}, function (error) {
    if (error) {
        console.log(error);
    }
});





// Start the server

module.exports = app;
