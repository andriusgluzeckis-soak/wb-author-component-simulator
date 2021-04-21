console.log("jquery version:"+$.fn.jquery);

var preRender = function (){
    console.log("preRender");
    console.log(this.model.attributes);
}

var postRender = function(){
  console.log("postRender");
}







preRender();
$(function() { 
    postRender();
});