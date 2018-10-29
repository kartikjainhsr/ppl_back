var mongoose = require('mongoose');

var register = mongoose.Schema({
	username : String,
	password : String,
	email : String,
	fname : String,
	lname : String,
	verified : {type : Boolean , default : false}
});

module.exports = mongoose.model('register',register);