var mongoose = require('mongoose');

var post = mongoose.Schema({
	fname : String,
	lname : String,
	caption : String,
	imageName : String,
    likes : {type : Array , default : []},
    comment : {type : Array , default : []},
    category : String,
    date : String,
    username : String
});

module.exports = mongoose.model('post',post);