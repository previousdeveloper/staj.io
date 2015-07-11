'use strict';

var express = require('express');
var router = express.Router();
var Company = require('../../model/company');
var libs = process.cwd() + '/libs/';
var User = require('../../model/users');

var log = require(libs + 'log')(module);


router.delete('/user/:id', function (req, res) {

    User.remove({_id: req.params.id}, function (err) {
        if (err) {
            log.error('Error deleting user with:' + {id: req.params.id} + err);
            return res.json(err);
        }
        return res.json({message: req.params.id + ':Successfully deleted'});
    });
});


router.post('/userRole/:id', function (req, res) {

    User.findOne({_id: req.params.id}, function (err, user) {

        if (err) {
            log.error('Error getting user' + {id: req.params.id} + err);
            return res.json(err);
        } else {
            user.role = req.body.role;
            user.save(function (err) {
                if (err) {
                    log.error('Error saving user role' + {id: req.params.id} + err);
                    return res.json(err);
                } else {
                    return res.json('User role updated');
                }
            })
        }
    });
});


router.get('/user', function (req, res) {

        User.find(function (err, user) {
            if (err) {
                log.error('Error getting user' + err);
                return res.json(err);
            } else {

                return res.json(user);
            }
        });
});


router.get('/normalusercount', function (req, res) {

    User.count({ 'role': 'User' },function (err, count) {
        var count = 0;
        if (err) {
            log.error('Error getting user' + err);
            return res.json(err);
        } else {

            return res.json({
                    message: count
                }
            )
        }
    });
})
;

module.exports = router;
