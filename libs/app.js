'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');
var ConnectRoles = require('connect-roles');
var libs = process.cwd() + '/libs/';
require(libs + 'auth/auth');


var config = require('./config');
var log = require('./log')(module);
var oauth2 = require('./auth/oauth2');

var company = require('./routes/company');
var api = require('./routes/api');
var users = require('./routes/users');
var backendCompany = require('./routes/backends/company');
var backendUser = require('./routes/backends/users');
var elasticsearch = require('./routes/elasticsearch');
var app = express();
var roles = new ConnectRoles();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(methodOverride());
app.use(passport.initialize());
app.use(roles.middleware());


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.header('Content-Type', 'application/json');
    next();
});


roles.use('company', function (req) {
    if ("admin" === req.user._doc.role) return true;
});

app.use('/v1', api);
app.use(config.get('api_version'), api);
app.use(config.get('api_version'), users);
app.use(config.get('api_version') + '/oauth/token', oauth2.token);
app.use(config.get('api_version'), users);
app.use(config.get('api_version'), company);
app.use(config.get('api_version'), elasticsearch);
app.use('/api/v1/backend', passport.authenticate('bearer', {session: false}), roles.can('company'), backendCompany);
app.use('/api/v1/backend', passport.authenticate('bearer', {session: false}), roles.can('company'), backendUser);


app.use(function (req, res) {
    res.status(404);
    log.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
        message: 'There is no endpoint like:' + req.url
    });
    return;
});

app.use(function (err, req, res) {
    res.status(err.status || 500);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
        error: err.message
    });
    return;
});


app.use(function (req, res) {
    res.status(401);
    log.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
        message: 'Uye girisi yapmalisin !'
    });
    return;
});


module.exports = app;
