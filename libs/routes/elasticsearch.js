'use strict';

var express = require('express');
var router = express.Router();
var Company = require('../model/company');


var stream = Company.synchronize();
var count = 0;

stream.on('data', function (err, doc) {
    count++;
});
stream.on('close', function () {
    console.log('indexed ' + count + ' documents!');
});
stream.on('error', function (err) {
    console.log(err);
});


Company.createMapping(function (err, mapping) {
    if (err) {
        console.log('error creating mapping (you can safely ignore this)');
        console.log(err);
    } else {
        console.log('mapping created!');
        console.log(mapping);
    }
});

router.post('/search', function (req, res) {

    var page = req.param('page') > 0 ? req.param('page') : 0;

    var query = req.body.q;

    if (page !== null && page !== undefined && query !== null & query !== undefined) {
        Company.search(
            {
                query_string: {
                    query: query
                }
            },
            {

                from: page * 6,
                size: 6,
                hydrate: true
            },
            function (err, results) {

                return res.json('company', {
                    company: results.hits.hits
                    , page: page
                    , pages: Math.ceil(results.hits.total / 6)
                    , count: results.hits.total
                });

            }
        );
    }


});


module.exports = router;