var express = require('express');
var router = express.Router();
var User = require('../models/User');
var md5Helper = require('../helpers/md5Helper');

router.get('/', function (req, res) {
    res.render('./user/index.html');
});

router.post('/signin', function (req, res) {
    var body = req.body;

    User.get(body.login, md5Helper.hash(body.password), body.email, function (err, data) {
        if (err)
            throw err;

        console.log(body, data);
        if (data) {
            if (md5Helper.checkPassword(body.password, data.password))
                res.send({redirect: '/weather'});
        } else {
            res.send({redirect: '/', status: 2});
        }
    })
});

router.post('/signup', function (req, res) {
    var body = req.body;

    User.create(body.login, md5Helper.hash(body.password), body.email, function (err, data) {
        if (err)
            throw err;

        console.log(body, data);
        if (data) {
            if (md5Helper.checkPassword(body.password, data.password))
                res.send({redirect: '/', status: 1});
        } else {
            res.send({redirect: '/', status: 2});
        }
    })
});

/////////// TEMPLATES ///////////

router.get('/tpl/signin', function (req, res) {
    res.render('./user/signin.html');
});

router.get('/tpl/signup', function (req, res) {
    res.render('./user/signup.html');
});

module.exports = router;