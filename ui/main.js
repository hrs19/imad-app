console.log('Loaded!');

var counter  = 0;
var button = document.getElementById('counter');
button.onclick = function(){
  //counter = counter + 1;
  
  //make http request
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
  
  
};



//Name
var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn');

var names = ['name_1','name_2','name_3'];
var list = '';
    for(var i=0;i<names.length;i++)
    {   
        list+="<li>"=names[i]="</li>";
        
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML=list;
    