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
                data: "Hata meydana geldi" + err
            });
        } else {
            if (currentUser) {
                return res.json({
                    type: false,
                    data: "Kullanıcı mevcut"
                });
            } else {

                if (req.body.username !== 'undefined'
                    && req.body.password !== 'undefined'
                    && req.body.password.length > 3
                    && req.body.name !== 'undefined'
                    && req.body.email !== 'undefined') {
                    var newUser = new User();
                    newUser.username = req.body.username;
                    newUser.password = req.body.password;

                    //Todo:Refactor check email and name empty
                    newUser.email = req.body.email;
                    newUser.name = req.body.name;
                    newUser.save(function (err) {
                        if (err) {
                            return res.json(err);
                        }
                    });
                    var client = new Client();
                    client.clientId = 'client';
                    client.clientSecret = 'client';
                    client.name = 'client';
                    client.save(function (err, client) {

                        if (!err) {
                            return res.json({
                                type: true,
                                data: 'kullanıcı başarıyla oluşturuldu'
                            });
                            log.info("New client - %s:%s", client.clientId, client.clientSecret);
                        } else {
                            return log.error(err);
                        }

                    });
                } else {
                    return res.json({
                        type: false,
                        data: 'Kullanıcı adı veya şifre boş olamaz'

                    })
                }
            }
        }
    });


});


router.get('/user', passport.authenticate('bearer', {session: false}), function (req, res) {

    res.json({

        userId: req.user._id,
        username: req.user.username,
        name: req.user.name,
        email: req.user.email
    });
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
                    return res.json(err);
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
    return res.json("Basariyla eklendi.");
});


router.post('/updateInformation', passport.authenticate('bearer', {session: false}), function (req, res) {

    if (req.user) {
        User.findOne({_id: req.user.id}, function (err, user) {
            user.email = req.body.email;
            user.save(function (err) {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json({message: 'Email added.'})
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
                    return res.json('Herhangi bir favori sirketin yok:(');
                } else {
                    return res.json(result);
                }

            });
        });
    }

});

module.exports = router;