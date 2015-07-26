'use strict';

var express = require('express');
var router = express.Router();
var Company = require('../../model/company');
var libs = process.cwd() + '/libs/';
var User = require('../../model/users');

var log = require(libs + 'log')(module);
var fs = require('fs');

router.post("/company", function (req, res) {

    Company.findOne({name: req.body.name}, function (err, result) {

        if (result === null || result === undefined) {
            var company = new Company();

            company.name = req.body.name;
            company.address = req.body.address;
            company.email = req.body.email;
            company.websiteUrl = req.body.websiteUrl;
            company.city = req.body.city;
            company.sector = req.body.sector;
            company.information = req.body.information;
            company.imgUrl = req.body.imgurl;

            company.save(function (err) {
                if (err) {
                    log.error('Error saving company' + err);
                    return res.json(err);
                } else {
                    return res.json({message: 'Company is successfully created.', status_code: res.status_code});

                }
            });

        } else {
            return res.json({message: 'Company is created before.', status_code: res.status_code});

        }
    });

});

router.get('/company', function (req, res) {

    Company.find(function (err, company) {

        if (err) {
            return res.json(err);
        } else {
            res.json(company)
        }
    });
});


router.delete('/company/:id', function (req, res) {

    Company.remove({_id: req.params.id}, function (err) {
        if (err) {
            log.error('Error deleting company with:' + {id: req.params.id} + err);
            return res.json(err);
        }
        return res.json({message: req.params.id + ':Successfully deleted'});
    });
});


router.put('/company/:id', function (req, res) {

    Company.findById(req.params.id, function (err, company) {
        if (err) {
            log.error('Updated  company :' + {id: req.params.id} + err);
            return res.json(err);
        }
        company.name = req.body.name;
        company.address = req.body.address;
        company.email = req.body.email;
        company.websiteUrl = req.body.websiteUrl;
        company.city = req.body.city;
        company.sector = req.body.sector;
        company.information = req.body.information;
        company.imgurl = req.body.imgurl;

        company.save(function (err) {
            if (err)
                return res.send(err);
            res.json({message: 'Company updated.', status_code: res.statusCode});
        });
    })
});

router.get('/totalUser', function (req, res) {

    User.count({}, function (err, count) {
        if (err) {
            log.error('Error getTotalUser' + err);
            return res.json(err);
        }
        return res.json(count);

    })
});


router.get('/totalCompany', function (req, res) {
    Company.count({}, function (err, companyCount) {

        if (err) {
            log.error('Error getTotalCompany' + err);
            return res.json(err);
        }
        return res.json(companyCount);
    })
});

router.get('/log', function (req, res) {


    fs.readFile(process.cwd() + '/logs/all.log.txt', function (err, data) {
        if (err) throw err;
        var array = data.toString().split("\n");

        res.json(array);

    });
});


module.exports = router;
