/* instance variables */
var baseUrl = window.location.origin;

/* instance objects */
var inputSearch = document.getElementById("search");
var boxSearchResult = document.getElementById("search-result");
var sectionArticle = document.querySelectorAll("section > article");

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

function verifyExist(post, text){

    if(post.title.indexOf(text) >= 0){
        return true;
    }
    
    if(post.description.indexOf(text) >= 0){
        return true;
    }
    
    if(post.content.indexOf(text) >= 0){
        return true;
    }
    
    return false;
}

function verifyContent(text){
    var html = '';
    var data = JSON.parse(sessionStorage.getItem("posts"));
    var posts = data.posts
    var posts_lenght = posts.length;
    
    for (i = 0; i < posts_lenght; i++) {
        var exist = verifyExist(posts[i], text);
        
        if(exist){
            html += '<div class="post-link"></a><a href="'+posts[i]['url']+'"><h2>'+posts[i]['title']+'</h2></a><span>'+posts[i]['description']+'</span></div>'
        }
        
        boxSearchResult.innerHTML = html;

    }
}

function getData(){
    var request = new XMLHttpRequest();
    request.open('GET', baseUrl+'/data.json', true);
    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data =request.responseText;
        sessionStorage.setItem("posts", data);
        verifyContent();
      } else {
        // We reached our target server, but it returned an error
      }
    };
    
    request.onerror = function() {
      // There was a connection error of some sort
    };
    
    request.send();
}

if(sessionStorage.getItem("posts") == null){
    getData();
}

inputSearch.addEventListener("input", function(){
    var text = this.value;
    var showSearch = false;
    
    //boxSearchResult sectionArticle
    if(text.length > 0 && showSearch == false){
        addClass(boxSearchResult, 'show');
        addClass(sectionArticle, 'hide');
        showSearch = true;
    }else if(text.length == 0 && showSearch == true){
        removeClass(boxSearchResult, 'show');
        removeClass(sectionArticle, 'hide');
        showSearch = false;
    }
    
    verifyContent(text);
});