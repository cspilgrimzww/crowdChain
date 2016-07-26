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
    var fundedProj = req.session.user.fundedProj;
    var fundedList = [];
    for(i in fundedProj){
        if(!(fundedList.indexOf(fundedProj[i].proj.id)>=0)){
            fundedList.push(fundedProj[i].proj.id);
        }
    }
    var list=[];
    if(fundedList.length>0){
        for(j in fundedList){
            console.log(fundedList[j]);
            models.Project.findOne({_id:fundedList[j]},function (err, project) {
                if(project){
                    list.push(project.toJson());
                }

                if(list.length >= fundedList.length){
                    return res.render('fundedList', {
                        projList: list
                    });
                }
                console.log('project-----'+project.toJson());
            })
        }
    }else{
        return res.render('fundedList', {
            projList: list
        });
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
