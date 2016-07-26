/**
 * Created by tyrion on 16-7-19.
 */var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var express = require('express');
var router = express.Router();
var models = require('../models/index')();
var fs = require('fs');
var path = require('path');
var config = require('../config');
var filter = require('../lib/filter');

/* GET home page. */
router.get('/raisedDetail/:id', filter.authorized_required, function(req, res, next) {
    var id = req.params.id;
    models.Project.findOne({_id:id}, function (err,result) {
        if(err){
            throw err;
        }else {
            return res.render('raisedDetail',{
                project:result.toJson()
            })
        }
    });
});
router.get('/projDetail/:id', filter.authorized_required, function(req, res, next) {
    var id = req.params.id;
    models.Project.findOne({_id:id}, function (err,result) {
        if(err){
            throw err;
        }else {
            return res.render('projDetail',{
                project:result.toJson()
            })
        }
    });
    // console.log(from);
    // res.render('projDetail',
    //     {
    //         title:"ProjDetail"
    //     });
});
router.get('/fundedDetail/:id', filter.authorized_required, function(req, res, next) {
    var id = req.params.id;
    models.Project.findOne({_id:id}, function (err,result) {
        if(err){
            throw err;
        }else {
            return res.render('fundedDetail',{
                project:result.toJson()
            })
        }
    });
});

router.post('/project', filter.admin_required, multipartMiddleware, function(req, res){
    var data = req.body;
    if (req.files && req.files.image.path != 'undifined') {
        var temp_path = req.files.image.path;
        if (temp_path) {
            fs.readFile(temp_path, function (err, content) {
                // 删除临时文件
                var fileType = req.files.image.type;
                console.log("fileType::::"+fileType);
                var imageType = fileType.split('/')[1];
                console.log("imageType::::"+imageType);
                var imageName = new Date().getTime() + '.' + imageType;
                console.log("imageName::::"+imageName);
                var savePath = path.join(__dirname, '../public/images/projects/'+imageName);
                console.log("savePath----"+savePath);
                fs.writeFile(savePath, content, function (err) {
                    if (err){
                        throw err;
                    }
                    else {
                        console.log("data::::"+data);
                        var new_proj = models.Project({
                            title: data.title,
                            brief: data.brief,
                            targetAmount: data.budget,
                            description: data.description,
                            deadline: data.deadline,
                            image:'/images/projects/'+imageName.toString(),
                            createTime: new Date()
                        });
                        console.log("new_proj::::"+JSON.stringify(new_proj));
                        new_proj.save(function(err) {
                            if(!err) {
                                res.redirect('/raisedDetail/'+new_proj._id);
                            } else {
                                throw err;
                            }
                        });
                    }
                    console.log("Save image success");
                    fs.unlink(temp_path);
                });
            });
        }else{
            res.json({
                data:'failed'
            })
        }
    }else{
        res.json({
            data:'failed'
        })
    }
});


router.post('/projDetail/:id/fund', filter.authorized_required, multipartMiddleware, function (req, res) {
    var id = req.params.id;
    var data = req.body;
    console.log(data);
    models.Project.findOne({_id:id}, function (err, proj) {
        if(err){
            throw err;
        }else {
            models.Users.findOne({_id: req.session.user._id}, function (err, user) {
                if(err){
                    throw err;
                }else{
                    if(data.fundAmount > user.balance){
                        return res.redirect('/404');
                    }else {
                        user.balance = Number(user.balance)-Number(data.fundAmount);
                        proj.raisedAmount += Number(data.fundAmount);
                        var tx = {
                            user:{id:user._id,email:user.email, name: user.name},
                            proj:{id:proj._id,title:proj.title,raisedAmount:proj.raisedAmount},
                            amount:data.fundAmount
                        };
                        proj.funders.push(tx);
                        user.fundedProj.push(tx);
                        proj.save();
                        user.save();
                        req.session.user=user;
                        return res.redirect('/projDetail/'+id);
                    }

                }
            })
        }
    })
    
});

module.exports = router;
