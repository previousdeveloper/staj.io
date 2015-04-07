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
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            return res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                return res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.username = req.body.username;
                userModel.password = req.body.password;
                userModel.save(function (err, user) {
                    user.save(function (err, user1) {
                        res.json({
                            type: true,
                            data: user1.username
                        });
                    });
                });
                var client = new Client({});
                client.save(function (err, client) {

                    if (!err) {
                        log.info("New client - %s:%s", client.clientId, client.clientSecret);
                    } else {
                        return log.error(err);
                    }

                });
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