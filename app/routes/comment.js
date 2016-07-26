/**
 * Created by tyrion on 16-7-26.
 */
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var express = require('express');
var router = express.Router();
var models = require('../models/index')();
var fs = require('fs');
var config = require('../config');
var filter = require('../lib/filter');

router.post('/comment',filter.authorized_required, multipartMiddleware, function(req,res){
    var data = req.body;
    models.Project.findOne({_id:data.projId}, function(err, proj){
        if(err){
            throw err;
        }else {
            proj.comments.push({
                time: new Date().toLocaleString(),
                content: data.content,
                email:req.session.user.email
            });
            proj.save();
            res.redirect('/projDetail/'+data.projId);
        }
    })
});

module.exports = router;
