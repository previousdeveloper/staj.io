/**
 * Created by gokhan on 4/3/15.
 */
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
    Company.search({query_string: {query: req.body.q}}, {hydrate:true}, function (err, results) {
       return res.json(results.hits.hits);
    });
});


module.exports = router;