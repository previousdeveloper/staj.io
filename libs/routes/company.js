var express = require('express');
var router = express.Router();
var Company = require('../model/company');
var NodeCache = require("node-cache");
var libs = process.cwd() + '/libs/';

var log = require(libs + 'log')(module);

var myCache = new NodeCache();

Company.find(function (err, results) {

    if (err) {
        log.error('Error  getting all company list' + err);
        return res.json(err);
    }
    myCache.set('getAllCompany', results, function (err, success) {
        if (!err && success) {

            log.info(success);
        }
    });
});

router.get('/getAllCompany', function (req, res) {
    myCache.get("getAllCompany", function (err, results) {
        if (!err) {
            return res.json(results);
        }
    });
});


router.get('/getSectorAndCity/:sector/:city', function (req, res) {

    var sector = req.params.sector;
    var city = req.params.city;

    Company.find({'sector': sector, 'city': city}, function (err, results) {
        if (err) {
            return res.json(err);
        }
        res.json(results);
    });
});


router.get('/getSector/:sector', function (req, res) {

    var sector = req.params.sector;

    Company.find({'sector': sector}, function (err, results) {

        if (err) {
            log.error('error getSector' + err);
            return res.json(err);
        }
        return res.json(results);
    });
});

router.get('/getCity/:city', function (req, res) {

    var city = req.params.city;

    Company.find({'city': city}, function (err, results) {

        if (err) {
            log.error('error getSector' + err);
            return res.json(err);
        }
        return res.json(results);
    });
});

module.exports = router;
