console.log('Loaded!');

var counter  = 0;
var button = document.getElementById('counter');
button.onclick = function(){
  //counter = counter + 1;
    var request = new XMLHttpRequest();
  
  
  request.onreadystatechange =function(){
    
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
            
        var counter =    request.responseText;
        var span = document.getElementById('count');
        span.innerHTML = counter.toString();
        
          
        
        }
        
    }
    
  };
 //make the req
  request.open('GET',"http://harshits1910.imad.hasura-app.io/counter",true);
  request.send(null);
  
  //make http request
};


//TO submit name and disp
var submit = document.getElementById('submit_btn');
submit.onclick=function(){

  var request = new XMLHttpRequest();
  
  
  request.onreadystatechange =function(){
    
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
            
        var counter =    request.responseText;
        var span = document.getElementById('count');
        span.innerHTML = counter.toString();
        
           var names = request.responseText;
           names  =JSON.parse(names);
var list = '';
    for(var i=0;i<names.length;i++)
    {   
        list += '<li>'+names[i]+'</li>';
        
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list; 
        
        }
        
    }
    
  };
 //make the req
 var nameInput = document.getElementById('name');
var name = nameInput.value;
  request.open('GET',"http://harshits1910.imad.hasura-app.io/submit-name?name="+name,true);
  request.send(null);
  
  
};















//Name username password to login

var submit = document.getElementById('submit_button');
submit.onclick=function(){

  var request = new XMLHttpRequest();
  
  
  request.onreadystatechange =function(){
    
    if(request.readyState===XMLHttpRequest.DONE){
        if(request.status===200){
        
        console.log('user logged in')   ; 
 
        
        }
        
    }
    
  };
 //make the req
 var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
//var name = nameInput.value;
console.log('username');
console.log('password');
  request.open('POST','http://harshits1910.imad.hasura-app.io/login',true);
  request.send(JSON.stringify({username: username,password: password}));
  
  
};

    