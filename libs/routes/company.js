/**
 * Created by gokhan on 3/31/15.
 */
var express = require('express');
var router = express.Router();
var Company = require('../model/company');


router.get('/getAllCompany', function (req, res) {
    Company.find(function (err, company) {

        if (err) {
            res.json(err);
        }
        res.send(company);
    });
});


router.get('/getSectorAndCity/:sector/:city', function (req, res) {

    var sector = req.params.sector;
    var city = req.params.city;

    Company.findOne({'sector': sector, 'city': city},
        'name email address city', function (err, person) {
            if (err) {
                res.json(err);
            }
            res.json(person);
        });
});


module.exports = router;
