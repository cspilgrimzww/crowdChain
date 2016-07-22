/**
 * Created by tyrion on 16-7-19.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/raisedDetail', function(req, res, next) {
    var from = req.params.from;
    console.log(from);
    res.render('raisedDetail',
        {
            title:"raisedDetail"
        });
});
router.get('/projDetail', function(req, res, next) {
    var from = req.params.from;
    console.log(from);
    res.render('projDetail',
        {
            title:"ProjDetail"
        });
});
router.get('/fundedDetail', function(req, res, next) {
    var from = req.params.from;
    console.log(from);
    res.render('fundedDetail',
        {
            title:"fundedDetail"
        });
});

module.exports = router;
