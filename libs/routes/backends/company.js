/**
 * Created by gokhan on 4/1/15.
 */
var express = require('express');
var router = express.Router();
var Company = require('../../model/company');
var libs = process.cwd() + '/libs/';
var User = require('../../model/users');

var log = require(libs + 'log')(module);

router.post("/addcompany", function (req, res) {
    var company = new Company();

    company.name = req.body.name;
    company.address = req.body.address;
    company.email = req.body.email;
    company.websiteUrl = req.body.websiteUrl;
    company.city = req.body.city;
    company.sector = req.body.sector;
    company.information = req.body.information;
    company.imgurl = req.body.imgurl;

    company.save(function (err) {
        if (err) {
            log.error('Error saving company' + err);
            return res.send(err);
        }
        res.json({message: 'Company is added', status_code: res.status_code});
    });
});


router.delete('/deleteCompany/:id', function (req, res) {

    Company.remove({_id: req.params.id}, function (err) {
        if (err) {
            log.error('Error deleting company with:' + {id: req.params.id} + err);
            return res.json(err);
        }
        res.json({message: req.params.id + ':Successfully deleted'});
    });
});


router.put('/changeCompany/:id', function (req, res) {

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
            return res.json(err);
        }
        return res.json(count);

    })
});

module.exports = router;
