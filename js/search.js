var baseUrl = window.location.origin;

function verifyContent(){
    var data = JSON.parse(localStorage.getItem("posts"));
    console.log(data.posts);
    var posts = data.posts
    var posts_lenght = posts.length;
    
    for (i = 0; i < posts_lenght; i++) {
        console.log(posts[i])
    }
}

function getData(){
    var request = new XMLHttpRequest();
    request.open('GET', baseUrl+'/data.json', true);
    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data =request.responseText;
        localStorage.setItem("posts", data);
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

getData();

/*if(localStorage.getItem("posts") != null){
    verifyContent();
}else{
    getData();
}
*/