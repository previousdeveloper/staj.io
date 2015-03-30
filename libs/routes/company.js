/**
 * Created by gokhan on 3/31/15.
 */
var express = require('express');
var router = express.Router();
var Company = require('../model/company');
var passport = require('passport');

//new instance for company.

router.post("/addcompany", passport.authenticate('bearer', {session: false}), function (req, res) {
    var company = new Company();

    company.name = req.body.name;
    //company.address = req.body.address;
    //company.email = req.body.email;
    //company.websiteUrl = req.body.websiteUrl;
    //company.city = req.body.city;
    //company.sector = req.body.sector;
    //company.information = req.body.information;
    //company.imgurl = req.body.imgurl;

    company.save(function (err) {
        if (err)
            res.send(err);
        res.json(res.statusCode);
    });
});


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


router.delete('/deleteCompany/:id', function (req, res) {

    Company.remove({_id: req.params.id}, function (err) {
        if (err) {
            res.json(err);
        }
        res.json({message: 'Successfully deleted'});
    });
});

module.exports = router;
