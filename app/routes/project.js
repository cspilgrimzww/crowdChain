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
router.get('/raisedDetail', filter.authorized_required, function(req, res, next) {
    var from = req.params.from;
    console.log(from);
    res.render('raisedDetail',
        {
            title:"raisedDetail"
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
router.get('/fundedDetail', filter.authorized_required, function(req, res, next) {
    var from = req.params.from;
    console.log(from);
    res.render('fundedDetail',
        {
            title:"fundedDetail"
        });
});

router.post('/project', filter.admin_required, multipartMiddleware, function(req, res){
    var data = req.body;
    if (req.files && req.files.image.path != 'undifined') {
        var temp_path = req.files.image.path;
        if (temp_path) {
            fs.readFile(temp_path, function (err, content) {
                // 删除临时文件
                var savePath = path.join(__dirname, '../public/images/projects/'+req.files.image.name);
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
                            image:'/images/projects/'+req.files.image.name,
                            createTime: new Date()
                        });
                        console.log("new_proj::::"+JSON.stringify(new_proj));
                        new_proj.save();
                        res.redirect('/newProj');
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

module.exports = router;
