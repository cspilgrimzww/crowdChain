/**
 * Created by tyrion on 16-7-23.
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var _Project = new Schema({
    title: { type: String, required: true, unique: true },
    brief: { type: String, required: true, unique: true },
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
    return {
        title: this.title,
        brief: this.brief,
        deadline: this.deadline,
        targetAmount: this.targetAmount,
        raisedAmount: this.raisedAmount,
        image: this.image,
        description: this.description,
        comments: this.comments,
        funders: this.funders,
        createTime: this.createTime.toLocaleString()
    }
};
var Project = mongoose.model('Project', _Project);

module.exports = Project;
