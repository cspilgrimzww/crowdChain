var express = require('express');
var router = express.Router();

var models = require('../models')();
//import lib
var filter = require('../lib/filter');

/* GET home page. */
router.get('/home', filter.authorized_required, function(req, res, next) {
    models.Project.find({},function (err, projects) {
        var list=[];
        for(i in projects){
            list.push(projects[i].toJson());
        }
        res.render('allList', {
            projList: list
        });
    })
});
router.get('/raised', filter.authorized_required, function(req, res, next) {
    res.render('raisedList', {
        title: 'Home'
    });
});
router.get('/funded', filter.authorized_required, function(req, res, next) {
    res.render('fundedList', {
        title: 'Home'
    });
});

router.get('/newProj',filter.authorized_required, function (req,res,next) {
    res.render('newProj');
});

router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
