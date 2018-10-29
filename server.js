var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyparser = require('body-parser');
app.use(cors());

var router = require('./router');


app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ppl',{ useNewUrlParser: true });


app.use('/',router);

var port = process.env.port || 5000;

app.listen(5000,function(){
	console.log('server started at: 5000');
})