var express = require('express');
var router = express.Router();
var libs = process.cwd() + '/libs/';
var User = require(libs + 'model/user');


router.post('/signUp', function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
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
                })
            }
        }
    });
});

module.exports = router;