var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) { //get request made to slash then this function is executed!
  res.sendFile(path.join(__dirname, 'ui', 'players.html'));
});
var counter=0;
app.get('/counter',function (req,res){
   counter=couner+1;
   res.send(counter.toString());
});
    


app.get('/article-one',function(req,res){//get request made to slash then this function is executed!
   res.sendFile(path.join(__dirname,'ui','article-one.html')); 
});

app.get('/article-three',function(req,res){//get request made to slash then this function is executed!
   res.sendFile(path.join(__dirname,'ui','art3.html')); 
});
app.get('/article-two',function(req,res){//get request made to slash then this function is executed!
   //res.send('Article 2 Requested and served');
   res.sendFile(path.join(__dirname,'ui','art2.html')); 
});
app.get('/ui/style.css', function (req, res) {//get request made to slash then this function is executed!
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
