var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');
var ConnectRoles = require('connect-roles');
var libs = process.cwd() + '/libs/';
require(libs + 'auth/auth');

//json web token
var jwt = require("jsonwebtoken");


var config = require('./config');
var log = require('./log')(module);
var oauth2 = require('./auth/oauth2');

var company = require('./routes/company');
var api = require('./routes/api');
var users = require('./routes/users');
var backendCompany = require('./routes/backends/company');

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
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


//Admin can access for company information.
roles.use('company', function (req) {
    if ("admin" === req.user._doc.role) return true;
});

app.use('/', api);
app.use('/api', api);
app.use('/api/', users);
app.use('/api/oauth/token', oauth2.token);
app.use('/api', users);
app.use('/api', company);
app.use('/api/backend', passport.authenticate('bearer', {session: false}), roles.can('company'), backendCompany);


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

module.exports = app;