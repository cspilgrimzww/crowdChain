/**
 * Created by tyrion on 16-7-24.
 */

var express = require('express');
var router = express.Router();

/* Add models. */
var User = require('../../models/Users').Users;

/* GET home page. */
router.post('/login',function(req,res){
    console.log('123');
    console.log(JSON.stringify(req.body));
    console.log(req.body.email);
    console.log(req.body.password);
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            res.code(400).json({
                data:err
            });
        }else if(user){
            user.comparePassword(req.body.password,function (result) {
                if(result){
                    console.log("req.session[session_id:"+req.session.id+"]"+JSON.stringify(req.session));
                    req.session.isAdmin = user.role == 'admin';
                    req.session.user = user;
                    console.log("req.session[session_id:"+req.session.id+"]"+JSON.stringify(req.session));
                    res.json({
                        data:'succeed'
                    })
                }else{
                    res.json({
                        data:'wrongPwd'
                    })
                }
            })
        }else{
            res.json({
                data:"notFound"
            })
        }
    })
});

module.exports = router;