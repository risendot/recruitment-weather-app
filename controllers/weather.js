var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('./weather/index.html');
});

/////////// TEMPLATES ///////////

router.get('/tpl/main', function (req, res) {
    res.render('./weather/main.html');
});

module.exports = router;