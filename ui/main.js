console.log('Loaded!');
var count = 0;
var button = document.getElementById('count');
button.onclick=function(){
    counter = counter+1;
    var span = getElementById('count');
    span.innerHtml = count.toString();
};