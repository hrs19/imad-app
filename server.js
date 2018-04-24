var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
    var name = req.params.name;
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
  content : `<p>This is the first article about 19th October which is  my birth date! </p>
          
          <p>Hey guys! Its HRS And todays my birthday......No CONTENT HENCE WRITING MEANINGLESS SENTENCES. .</p>`,
          
          img : 'http://nptel.ac.in/noc/Candidate_photopath/Jul-Sep%202017/STSEP171060874_photo.jpg'
    
    
},

 'article-three' : {
    title:'Article Three | HRS | IMAD',
  head : 'Artilce Three',
  date : '23th Oct,2017',
  content : `<p>This is the first article about 15th October which is not my birth date! </p>
          
         `,
          
          img : 'https://en.wikipedia.org/wiki/Ryan_Reynolds#/media/File:Ryan_Reynolds_by_Gage_Skidmore.jpg'
},
};
function createTemp(data){
    var title=data.title;
    var date=data.date;
    var head=data.head;
    var content=data.content;
    var img = data.img;

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
            <img src="${img}" alt="Great Stairs" height="200" width="200" class="img-medium"/>
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

app.get('/:articleName',function(req,res){
   var articleName = req.params.articleName;
     res.send(createTemp(articles[articleName])); 
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
