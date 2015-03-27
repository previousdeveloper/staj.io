/**
 * Created by gokhan on 3/26/15.
 */
var mongoose = require('mongoose');
var Company = require('../models/company');

module.exports = function (app) {
    var company = new Company();

    app.post("/addcompany", function (req, res) {

        company.name = req.body.name;
        company.address = req.body.address;
        company.email = req.body.email;
        company.websiteUrl = req.body.websiteUrl;
        company.city = req.body.city;

        company.save(function (err) {
            if (err)
                res.send(err);

            res.json(res.statusCode);
        });
    });


    app.get('/getAllCompany', function (req, res) {
        mongoose.model('Company').find(function (err, company) {

            if (err) {
                res.json(err);
            }
            res.send(company);
        });
    });


    app.get('/getSectorAndCity/:sector/:city', function (req, res) {

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


    // catch-all
    app.get('*', function (req, res) {
        res.status(404).json({message: 'Invalid GET request'})
    });
    app.post('*', function (req, res) {
        res.status(404).json({message: 'Invalid POST request'})
    });
    app.delete('*', function (req, res) {
        res.status(404).json({message: 'Invalid DELETE request'})
    })
};