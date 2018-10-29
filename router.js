var express = require('express');
var router = express.Router();
var api = require('./api');
var Promise = require('promise');
var multer = require('multer');
var upload = multer({ dest: '../ppl_front/public/' });

router.post('/register', async (req,res) => {
	console.log(req.body);

	try{
		let x = await api.register(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});


router.post('/login', async (req,res) => {
	console.log(req.body);
	try{
		let x = await api.login(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});


router.post('/verify', async (req,res) => {
	try{
		let x = await api.verify(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/forgot_password', async(req,res) => {
	try{
		let x = await api.forgot_password(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/new_password', async(req,res) => {
	try{
		let x = await api.new_password(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/upload_post', upload.single('imageName'), async(req,res) => {
	try{
		let x = await api.upload_post(req.body,req.file);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});


router.post('/upload_category', upload.single('imageName'), async(req,res) => {
	try{
		let x = await api.upload_category(req.body,req.file);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/fetch_category', async(req,res) => {
	try{
		let x = await api.fetch_category(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/fetch_post', async(req,res) => {
	try{
		let x = await api.fetch_post(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/likes_handler', async(req,res) => {
	try{
		let x = await api.likes_handler(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/comment_handler', async(req,res) => {
	try{
		let x = await api.comment_handler(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});

router.post('/fetch_comment', async(req,res) => {
	try{
		let x = await api.fetch_comment(req.body);
		console.log(x);
		res.send(x);
	}
	catch(err)
	{
		console.log(err);
		res.send('err');
	}
});




module.exports = router;