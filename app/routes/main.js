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
        list.sort(function(a,b){
            return a.createTime <=  b.createTime;
        });
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
    var fundedList = req.session.user.fundedProj;
    var list=[];
    for(i in fundedList){
        console.log(fundedList[i].proj.id);
        models.Project.findOne({_id:fundedList[i].proj.id},function (err, project) {
            if(project){
                list.push(project.toJson());
            }
            console.log('project-----'+project.toJson());
        })
    }
    while(1){
        if(i>=fundedList.length-1){
            return res.render('fundedList', {
                projList: list
            });
        }
    }
});

router.get('/newProj',filter.authorized_required, function (req,res,next) {
    res.render('newProj');
});

router.get('/logout', function(req, res){
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
