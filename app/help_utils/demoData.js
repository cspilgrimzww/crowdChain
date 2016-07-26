/**
 * Created by tyrion on 16-7-23.
 */
var Project = require('../models/Project');
var User = require('../models/Users').Users;
var demoData = function () {

    var new_user1 = new User({
        email : 'employee1@mail.com',
        password : '123456',
        accountAddr : "0xab338cc8d88f09ee29203a992c228ec5",
        createTime : new Date(),
        totalAssets: 980000000,
        balance: 980000000,
        role: 'employee'
    });
    var admin = new User({
        email : 'admin1@mail.com',
        password : '123456',
        accountAddr : "0xab338cc8d3212ccab203a992c228ec5d",
        createTime : new Date(),
        totalAssets: 0,
        role: 'admin'
    });
    new_user1.save();
    admin.save();
};
module.exports.demoData = demoData;
// var new_proj = new Project({
//     title: "",
//     description: { type:String, required: true },
//     comments: { type: Array },
//     funders: { type: Array },
//     createTime: { type: Date, default: Date.now },
//     targetAmount: { type: String, required: true },
//     raisedAmount: { type: Number, default:0 }
// });