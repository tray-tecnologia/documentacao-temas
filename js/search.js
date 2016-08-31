var baseUrl = window.location.origin;
/* var status if the search is being shown */
var showSearch = false;

/* instance objects */
var inputSearch = document.getElementById("search");
var boxSearchResult = document.getElementById("search-result");
var sectionArticle = document.getElementById("content-main");

function addClass(el, className) {
    if (el.classList) {
        el.classList.add(className);
    }else{
        el.className += ' ' + className;
    }
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function removeAccents(str) {
  var accents    = 'ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
  var accentsOut = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
  str = str.split('');
  var strLen = str.length;
  var i, x;
  for (i = 0; i < strLen; i++) {
    if ((x = accents.indexOf(str[i])) != -1) {
      str[i] = accentsOut[x];
    }
  }
  return str.join('');
}


function verifyExist(post, text){
    
    text = removeAccents(text.toLowerCase());
    var title = removeAccents(post.title.toLowerCase());
    var description = removeAccents(post.description.toLowerCase());
    var content = removeAccents(post.content.toLowerCase());
    
    if((title.indexOf(text) >= 0) || (description.indexOf(text) >= 0) || (content.indexOf(text) >= 0)){
        return true;
    }
    
    return false;
}

function verifyContent(text){
    var html = '';
    var data = JSON.parse(sessionStorage.getItem("posts"));
    var posts = data.posts
    var posts_lenght = posts.length;
    
    var count = 0;
    
    for (i = 0; i < posts_lenght; i++) {
        var exist = verifyExist(posts[i], text);
        
        if(exist){
            html += '<div class="post-link"></a><a href="'+posts[i]['url']+'"><h2>'+posts[i]['title']+'</h2></a><span>'+posts[i]['description']+'</span></div>'
            count++;
        }
    }
    
    if(count == 1){
        html += '<p>Resultados: <b>1 resultado encontrado</b></p>';
    }else if(count == 0){
        html += '<p>Resultados: <b>Nenhum</b> resultado encontrado</p>';
    }else{
        html += '<p>Resultados: <b>'+count+' resultados encontrado</b></p>';
    }
    
    boxSearchResult.innerHTML = html;
}

function getData(){
    var request = new XMLHttpRequest();
    request.open('GET', baseUrl+'/data.json', true);
    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = request.responseText;
        sessionStorage.setItem("posts", data);
      } else {
        console.log("Ops! Ocorreu um erro! CODE: 001");
      }
    };
    
    request.onerror = function() {
      console.log("Ops! Ocorreu um erro! CODE: 002");
    };
    
    request.send();
}

if(sessionStorage.getItem("posts") == null){
    getData();
}

inputSearch.addEventListener("input", function(){
    var text = this.value;
    
    if(text.length > 0 && showSearch == false){
        addClass(sectionArticle, 'hide');
        addClass(boxSearchResult, 'show');
        showSearch = true;
    }else if(text.length == 0 && showSearch == true){
        removeClass(boxSearchResult, 'show');
        removeClass(sectionArticle, 'hide');
        showSearch = false;
    }

    verifyContent(text);
});

document.getElementById("site-footer").addEventListener("dblclick", function(){
    sessionStorage.clear();
});