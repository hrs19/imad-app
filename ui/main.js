console.log('Loaded!');

var counter  = 0;
var button = document.getElementById('counter');
button.onclick = function(){
  //counter = counter + 1;
  
  //make http request
  var request = XMLHttpRequest();
  
  
  request.onreadystatechange =function(){
    
    if(request.readyState===XMLHttpRequest){
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