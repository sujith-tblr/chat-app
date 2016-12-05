var express = require('express');
var router = express.Router();
var model = require('./../model/db');

router.get('/', function(req, res, next) {
res.render('index2');
});

router.get('/show', function(req, res, next) {
var client1=req.query.client;
var server1=req.query.server;

		model.getMessageFinal(client1,server1,function(err, row, numRows) {	
	
	  res.render('index',{row: row, num: numRows ,client2: client1 ,server2: server1});
	});
});

router.post('/register', function(req, res, next) {

	model.insertInto(req.body.name,req.body.password,req.body.email,function(err) {	
		 res.send("Success");
	});
});

router.post('/login', function(req, res, next) {

	model.getCredentials(req.body.name,req.body.password,function(err,rows) {	
		 
		 var client=req.body.group_id;
		  var server=req.body.name;
		 if(rows)
		  res.redirect('/show?client='+client+'&server='+server);
		 
		else
			 res.send("Login Failure");
	});
});

router.post('/msg', function(req, res, next) {

var chat_id=req.body.ser+req.body.cli;
	model.sendMessage(req.body.message,req.body.ser,chat_id,function(err) {	
		 
	});

  res.redirect('/show?client='+req.body.cli+'&server='+req.body.ser);
});

router.get('/update', function(req, res, next) {

var client1=req.query.client;
var server1=req.query.server;
var arr={};
	model.getMessageFinal(client1,server1,function(err, row, numRows) {	
	
	arr.row=row;
	arr.num=numRows;
	  res.send(arr);
	});
});

module.exports = router;

