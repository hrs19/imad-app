console.log('Loaded!');
var counter = 0;
var button = document.getElementById('counter');
button.onclick=function(){
    counter = counter+1;
    var span = getElementById('counter');
    span.innerHtml = counter.toString();
};