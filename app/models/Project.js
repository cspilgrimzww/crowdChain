/**
 * Created by tyrion on 16-7-23.
 */

var mongoose = require('mongoose');
// var contractInterface = require('../../crowdFunding/contractInterface');

var Schema = mongoose.Schema;
var _Project = new Schema({
    title: { type: String, required: true},
    brief: { type: String, required: true},
    description: { type:String, required: true },
    comments: { type: Array },
    funders: { type: Array },
    image: {type:String, required:true},
    createTime: { type: Date, default: Date.now },
    deadline: {type: Date, default: Date.now},
    targetAmount: { type: String, required: true, default:999999999999 },
    raisedAmount: { type: Number, default:0 }
});


_Project.methods.toJson = function(){
    var daysLeft=(this.deadline-(new Date()))/(1000*60*60*24).toFixed(0);
    // var balance = contractInterface.getProjectBalance('0x'+this._id);
    // console.log(balance);
    var comments = this.comments.sort(function(a,b){
        return a.time<=b.time;
    });
    return {
        id: this._id,
        title: this.title,
        brief: this.brief,
        deadline: this.deadline,
        targetAmount: this.targetAmount,
        // raisedAmount: balance,
        raisedAmount: this.raisedAmount,
        image: this.image,
        description: this.description,
        comments: this.comments,
        funders: this.funders,
        createTime: this.createTime.toLocaleString(),
        percentage: (this.raisedAmount/this.targetAmount).toFixed(2),
        daysLeft: daysLeft>0?daysLeft.toFixed(0):'expired'
    }
};
var Project = mongoose.model('Project', _Project);

module.exports = Project;
