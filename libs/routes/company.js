/**
 * Created by gokhan on 3/31/15.
 */

var express = require('express');
var router = express.Router();
var Company = require('../model/company');
var NodeCache = require("node-cache");
var libs = process.cwd() + '/libs/';

var log = require(libs + 'log')(module);

var myCache = new NodeCache();


//Get All Company List
Company.find(function (err, company) {

    if (err) {
        return res.json(err);
    }
    myCache.set('getAllCompany', company, function (err, success) {
        if (!err && success) {

        }
    });
});

router.get('/getAllCompany', function (req, res) {
    myCache.get("getAllCompany", function (err, value) {
        if (!err) {
            res.json(value);
        }
    });
});


router.get('/getSectorAndCity/:sector/:city', function (req, res) {

    var sector = req.params.sector;
    var city = req.params.city;

    Company.find({'sector': sector, 'city': city}, function (err, company) {
        if (err) {
            return res.json(err);
        }
        res.json(company);
    });
});


router.get('/getSector/:sector', function (req, res) {

    var sector = req.params.sector;

    Company.find({'sector': sector}, function (err, company) {

        if (err) {
            log.error('error getSector' + err);
            return res.json(err);
        }
        return res.json(company);
    });

});

module.exports = router;
