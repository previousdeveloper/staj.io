/**
 * Created by gokhan on 3/26/15.
 */
var app = require('../../server');
var config = require('../../app/config/dbconfig');
var winston = require('winston');


app.listen(config.app.port, function () {
    winston.info(config.app.port + ":working");
});