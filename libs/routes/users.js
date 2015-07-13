'use strict';

var express = require('express');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var User = require(libs + 'model/users');

var log = require(libs + 'log')(module);
var config = require(libs + 'config');
var passport = require('passport');
var Company = require('../model/company');

var Client = require(libs + 'model/client');
var AccessToken = require(libs + 'model/accessToken');
var RefreshToken = require(libs + 'model/refreshToken');


router.post('/signUp', function (req, res) {
    User.findOne({username: req.body.username}, function (err, currentUser) {
        if (err) {
            return res.json({
                type: false,
                message: "Hata meydana geldi" + err
            });
        } else {
            if (currentUser) {
                return res.json({
                    type: false,
                    message: "Kullanici mevcut"
                });
            } else {

                if (
                    req.body.password == 'undefined' ||
                    req.body.password == '' ||
                    req.body.username == 'undefined' ||
                    req.body.username == '' ||
                    req.body.email == 'undefined' ||
                    req.body.email == '' ||
                    req.body.name == 'undefined' ||
                    req.body.name == ''
                ) {
                    return res.json({
                        type: false,
                        message: 'Kullanici adi veya sifre bos olamaz'

                    });

                }
                else {

                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.password = req.body.password;


                    newUser.email = req.body.email;
                    newUser.name = req.body.name;

                    newUser.save(function (err) {
                        if (err) {
                            return res.json({
                                type: false,
                                message: err
                            });
                        } else {
                            var client = new Client();
                            client.clientId = 'client';
                            client.clientSecret = 'client';
                            client.name = 'client';
                            client.save(function (err, client) {
                                if (!err) {
                                    return res.json({
                                        type: true,
                                        message: 'Kullanici olusturuldu'
                                    });
                                } else {
                                    return log.error(err);
                                }

                            });
                        }
                    });
                }
            }
        }
    });


});


router.get('/user', passport.authenticate('bearer', {session: false}), function (req, res) {

    if (res !== undefined) {


        return res.json({

            userId: req.user._id,
            username: req.user.username,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        });
    } else {
        return res.json({
            type: false,
            message: 'Kullanici bilgisi hatasi'
        })
    }

});

router.post('/changePassword', passport.authenticate('bearer', {session: false}), function (req, res) {

    if (req.user) {
        User.findOne({_id: req.user.id}, function (err, user) {

            //if (user.password != req.body.password) {
            //    return res.json('wrong password');
            //}

            user.password = req.body.newpassword;
            user.save(function (err) {
                if (err) {
                    return res.json({
                        message: err
                    });
                } else {
                    return res.json({message: 'Password changed.'})
                }
            });


        });
    }
});


router.post('/addCompany', passport.authenticate('bearer', {session: false}), function (req, res) {


    if (req.user) {
        User.findOne({_id: req.user.id}, function (err, user) {

            Company.findOne({_id: req.body.companyId}, function (err, company) {
                if (err) {
                    log.error('Finding  company :' + {_id: req.body.companyId} + err);
                    return res.json(err);
                } else {
                    // user.followedCompanies.push(company);
                    user.company.push(company._doc);
                    user.save();
                }
            });
        });
    }
    return res.json({
        type: true,
        message: 'Sirket takip listesine eklendi'
    });
});


router.post('/updateInformation', passport.authenticate('bearer', {session: false}), function (req, res) {

    if (req.user) {
        User.findOne({_id: req.user.id}, function (err, user) {
            user.email = req.body.email;
            user.save(function (err) {
                if (err) {
                    return res.json({
                        message: err
                    });
                } else {
                    return res.json({message: 'Email adresi guncellendi.'})
                }
            });
        });
    }
});

router.get('/favored', passport.authenticate('bearer', {session: false}), function (req, res) {


    if (req.user) {
        User.findOne({_id: req.user.id}, function (err, user) {

            var companyList = user._doc.company;

            Company.find({
                '_id': {$in: companyList}
            }, function (err, result) {

                if (result.length == 0) {
                    return res.json({
                        message: 'Herhangi bir favori sirketin yok:('
                    });
                } else {
                    return res.json(result);
                }

            });
        });
    }

});

module.exports = router;