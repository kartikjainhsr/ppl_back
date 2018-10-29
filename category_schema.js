var mongoose = require('mongoose');

var category = mongoose.Schema({
	imageName : String,
    category : String
});

module.exports = mongoose.model('category',category);