/**
 * Created by tyrion on 16-7-19.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/projDetail', function(req, res, next) {
    res.render('projDetail');
});

module.exports = router;
