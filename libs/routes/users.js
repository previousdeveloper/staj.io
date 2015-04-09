var express = require('express');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var User = require(libs + 'model/users');

var log = require(libs + 'log')(module);
var db = require(libs + 'db/mongoose');
var config = require(libs + 'config');
var passport = require('passport');

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

                if (req.body.username != '' && req.body.password != '' && req.body.password.length > 3) {
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
                            res.json({
                                type: false,
                                data: 'kullanıcı başarıyla oluşturuldu'
                            });
                            log.info("New client - %s:%s", client.clientId, client.clientSecret);
                        } else {
                            return log.error(err);
                        }

                    });
                } else {
                    res.json('Kullanıcı adı veya şifre boş olamaz')
                }


            }
        }
    });


});


router.post('/changePassword', passport.authenticate('bearer', {session: false}), function (req, res) {

    if (req.user) {
        User.findOne({_id: req.user.id}, function (err, user) {

            if (user.password != req.body.password) {
                return res.json('wrong password');
            }
            else {
                user.password = req.body.newpassword;
                user.save(function (err) {
                    if (err) {
                        return res.json(err);
                    } else {
                        return res.json({message: 'Password changed.'})
                    }
                });
            }


        });
    }
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

module.exports = router;