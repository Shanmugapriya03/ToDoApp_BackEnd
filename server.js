var express = require('express');
var app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'todo'
});

connection.connect(function(err){
  if(err)
    throw err;
});

//CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/add',function(req,res){
  var values ={
  todo:req.query.todo
  }
  connection.query('INSERT into list SET ?',[values],function(err, rows, fields){
    if(err){
      throw err;
    }else{
      res.json({
            message:"Added to List"
      });
    }
  });
});

app.get('/read',function(req,res){
  connection.query('SELECT * FROM list',function(err, rows, fields){
    if(err){
      throw err;
    }else{
      res.json(rows);
    }
  });
});

app.get('/delete',function(req,res){
  var todoId = req.query.todoId;
  connection.query('DELETE FROM list WHERE id = ?',[todoId],function(err, rows, fields){
    if(err){
      throw err;
    }else{
      if(rows.affectedRows==1){
        res.json({
              message:"Deleted Succesfully"
        });
      }else{
        res.json({
              message:"Deletion unsuccesful"
        });
      }
    }
  });
});

var server = app.listen(8000, function () {
  var port = server.address().port

  console.log("Example app listening at port %s",port)
});
