console.log('Loaded!');
var count = 0;
var button = document.getElementById('counter');
button.onclick=function(){
    counter = counter+1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};