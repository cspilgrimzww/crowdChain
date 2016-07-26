
/**
 * Created by Tyrion on 2016/5/25.
 */
var mongoose = require('mongoose');
var base64_util = require("../help_utils/base64_util");

var Schema = mongoose.Schema;
var _User = new Schema({
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true},
    accountAddr : { type: String, required: true},
    createTime : { type: Date, default: Date.now },
    totalAssets:{ type: Number, default:0},
    balance: { type: Number, default:0},
    role: {type:String, required:true, default:'employee'},
    fundedProj:{ type: Array}
});
//Password verification
_User.methods.comparePassword = function(password, cb) {    
    if(password == this.password){
        return cb(true);
    }
    return cb(false);
};
_User.methods.toJson = function(){
  return {
      phone: this.phone,
      create_time: this.create_time.toLocaleString(),
      accountAddr: this.accountAddr
  }
};

var Users = mongoose.model('User', _User);



//A middleware to verify User token
/**
 * When use this middleware ,your code should gose like this:
 *    app.get('/something', authToken, function(req, res){
 *    // do something
 *    });
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
var verify_psw = function(req,res,next){
    console.log("==========="+req.body);
    var psw = req.body.psw;
    if(psw){
        if(!req.user){
            return res.status(401).send({
                status: "refuse",
                msg: "token错误"
            })
        }
        req.user.comparePassword(psw, function(result){
            if(result){
                return next();
            }else{
                return res.status(401).send({
                    status: "refuse",
                    msg: "请输入正确的密码"
                })
            }
        })
    }else{
        return res.status(401).send({
            status: "refuse",
            msg: "请输入密码"
        })
    }
};

var authorize = function(req, res, next) {
    if (!req.session.user_id) {
        res.redirect('/admin/login');
    } else {
        next();
    }
}
module.exports.authorize = authorize;
module.exports.Users = Users;
module.exports.verify_psw = verify_psw;
