var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto  = require('crypto');
var app = express();

var bodyParser = require('body-parser');
var session = require('express-session');



app.use(morgan('combined'));
app.use(bodyParser.json());
function hash(input,salt){
    //how to create hash? using default crypto lib!
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
    
    
}
app.use(session({
    secret:'someRandomSecretValue',
    cookie: {maxAge:1000*60*60*24*30}
}));



app.get('/hash/:input',function(req,res){
   var hashedString = hash(req.params.input,'this-is-some-random-string');
   res.send(hashedString);
});

//function to create user
app.post('/user',function(req,res){
    var username= req.body.username;
    var password= req.body.password;
    
    
    var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function(err,result){
       
        if(err){
           res.status(500).send(err.toString());
       }
       else{
           if(result.rows.length===0){
               res.status(404).send('Article Not Found');
           }
           else{
               var articleData =result.rows[0];
               res.send('User Successfully created : '+username);
           }
       }
        
   });
});


app.post('/login',function(req,res){
    var username= req.body.username;
    var password= req.body.password;
    
    
    //var salt = crypto.randomBytes(128).toString('hex');
   //var dbString = hash(password,salt);
   pool.query('SELECT * from "user" WHERE username = $1',[username],function(err,result){
       
        if(err){
           res.status(500).send(err.toString());
       }
       else{
           if(result.rows.length===0){
               res.status(403).send('Invalid username or password');
           }
           else{
               //var articleData =result.rows[0];
               var dbString = result.rows[0].password;
              var salt= dbString.split('$')[2];
              var hashedPassword = hash(password,salt);//creating the hashed version of password using password and salt
              if(hashedPassword===dbString){
               res.send('Login Successful : '+username);
                //sETTING UP A SESSION  
                  
                  
                  
              }
               else{
               res.send('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');}
           }
       }
        
   });
});


var config = {
  user : 'harshits1910',
  database:'harshits1910',
  host: 'db.imad.hasura-app.io',
  port:'5432',
  password: process.env.DB_PASSWORD
  
};

var pool = new Pool(config);
app.get('/test-db',function(req,res){
   //move a select req
   
   //return a response with result
   pool.query('SELECT * FROM article',function(err,result){
      if(err){
          res.status(500).send(err,toString());
      }
      else{
          res.send(JSON.stringify(result.rows));
      }
       
   });
});



app.get('/', function (req, res) { //get request made to slash then this function is executed!
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var counter=0;
app.get('/counter',function (req,res){
   counter=counter+1;
   res.send(counter.toString());
});
    

var names =[];
app.get('/submit-name',function(req,res){
    var name = req.query.name;
    names.push(name);
    //json java script object notation
    res.send(JSON.stringify(names));
});



var articles = {
 'article-one' : {
    title:'Article One | HRS | IMAD',
  head : 'Artilce One',
  date : '15th Oct,2017',
  content : `<p>This is the first article about 15th October which is not my birth date! </p>
          
          <p>This is the first article a great stair which stood in the middle of no where as a ruin!This is the first article a great stair which stood in the middle of no where as a ruin!This is the first article a great stair which stood in the middle of no where as a ruin!This is the first article a great stair which stood in the middle of no where as a ruin!</p>
          <p>This had seen the wrath of time! </p>`,
          img : 'https://img00.deviantart.net/5e2d/i/2012/317/6/0/png_steps_by_paradise234-d5kvomt.png'
},

 'article-two' : {
     title:'Article Two | HRS | IMAD',
  head : 'Artilce Two',
  date : '19th Oct,2017',
  content : `<p>This article is about Robert Downey Jr. </p>
          
          <p>Robert John Downey Jr. (born April 4, 1965)[2] is an American actor and singer. His career has included critical and popular success in his youth, followed by a period of substance abuse and legal troubles, and a resurgence of commercial success in middle age. For three consecutive years from 2012 to 2015, Downey topped the Forbes list of Hollywood's highest-paid actors, making an estimated $80 million in earnings between June 2014 and June 2015</p>`,
          
          img : 'https://upload.wikimedia.org/wikipedia/commons/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg'
    
    
},

 'article-three' : {
    title:'Article Three | HRS | IMAD',
  head : 'Artilce Three',
  date : '23th Oct,2017',
  content : `<p>Ryan Rodney Reynolds was born on October 23, 1976, in Vancouver, British Columbia.His father, James Chester "Jim" Reynolds,was a food wholesaler, and his mother, Tammy, a retail salesperson</p>
  <p>He's Deadpool !</p>
          
         `,
          
          img : 'https://upload.wikimedia.org/wikipedia/commons/9/90/Ryan_reynolds.jpg'
},
};
function createTemp(data){
    var title=data.title;
    var date=data.date;
    var head=data.head;
    var content=data.content;
    //var img = data.img;

var template =`
<!doctype html>
<html>
    <head>
    <title>${title}</title>
<link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
         <a href="http://harshits1910.imad.hasura-app.io"> HOME </a>
        <div class="container">
            
        </div>
        <br>
        <hr/>
        <div class="container">
            <h3>${head}</h3>
          <div>${date}</div>
          ${content}
        </div>
        <script type="text/javascript" src="/ui/main.js">
        </script>
    </body>
</html>`
;
return template;
}

app.get('/articles/:articleName',function(req,res){
  // var articleName = req.params.articleName;
   
  // var articleData  ;
   
   pool.query("SELECT * FROM article WHERE title = '"+req.params.articleName+"'" ,function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           if(result.rows.length===0){
               res.status(404).send('Article Not Found');
           }
           else{
               var articleData =result.rows[0];
               res.send(createTemp(articleData));
           }
       }
        
   });
   //  res.send(createTemp(articles[articleData])); 
});


app.get('/ui/style.css', function (req, res) {//get request made to slash then this function is executed!
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {//get request made to slash then this function is executed!
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
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
