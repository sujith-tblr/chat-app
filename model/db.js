var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'chat'
});
connection.connect();
exports.getMessage = function(table,callback) {
   
    connection.query('SELECT name, message FROM '+table, function(err, rows, fields) {
        if (err) throw err;
        numRows = rows.length;
        callback(err,rows,numRows);
    });
}

exports.getMessageFinal = function(client,server,callback) {
  
    connection.query('select * from chat where name= ? OR name= ? AND chat_id= ?',[client,server,server+client], function(err, rows, fields) {
        if (err) throw err;
        numRows = rows.length;
        callback(err,rows,numRows);
    });
}

 exports.sendMessage = function(msg,name,chat_id,callback) {
  var post  = {name: name, message: msg , chat_id: chat_id};
  connection.query('INSERT INTO chat SET ?', post, function(err) {

   if (err) throw err;
       
   callback(err);
    });
}

 exports.insertInto = function(name,password,email,callback) {
  var post  = {name: name, email: email, password:password};
  connection.query('INSERT INTO user_details SET ?', post, function(err) {

   if (err) throw err;
       var post1  = {name: name, message:"Conversation started"};
       connection.query('INSERT INTO chat SET ?', post1, function(err) {

   if (err) throw err;
       


   callback(err);
    });
     });
}


 exports.getCredentials = function(name,password,callback) {



    //var post  = {name: name, password:password};
 connection.query('SELECT id FROM user_details WHERE name= ? AND password=?',[name,password], 

  function(err, rows) {
        if (err) throw err;
        
        callback(err,rows[0]);
    });
}


