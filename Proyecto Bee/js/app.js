window.addEventListener('load', Proyecto, false);

function Proyecto(){


    var bees = [];
    var posts = [];
    var beesUrl = 'https://beehive-270a2.firebaseio.com/data/users.json'; 
    var postsUrl = 'https://beehive-270a2.firebaseio.com/data/posts.json'; 
    var commentsUrl = 'https://beehive-270a2.firebaseio.com/data/comments.json';

    function sendRequest(url, callBack){
        var request = new XMLHttpRequest();
        request.addEventListener('load', callBack);
        request.open('GET', url);
        request.send();
    }

    sendRequest(beesUrl, getBeesComplete);

    // Extraer los bees de el url 
    //function getBees(){
        //var request = new XMLHttpRequest();
        //request.addEventListener('load', getBeesComplete);
        //request.open('GET', beesUrl);
        //request.send();
    //}

    function getBeesComplete(e){
         var request = e.target;

        if (request.status === 200) {

            //console.log(request.responseText);
            var data = JSON.parse(request.responseText);
            //console.log(data);

            data.forEach(function (beeData){
             var bee = new Bee(beeData.name, beeData.address, beeData. phone, beeData.username, beeData.company, beeData.email,beeData.website, beeData.id);
             bees.push(bee);
             //console.log(bees);
            });

        } else{
            console.log('erroren on request');
        }
    }

    // Extraer los posts de el url 

    //function getPosts(){
        //var request = new XMLHttpRequest();
        //request.addEventListener('load', getPostsComplete);
        //request.open('GET', postsUrl);
        //request.send();
    //}

    sendRequest(postsUrl, getPostsComplete);

    function getPostsComplete(e){

        var request = e.target;

        if (request.status === 200) {

            //console.log(request.responseText);
            var data = JSON.parse(request.responseText);
            //console.log(data);

            for (let i = 0; i < data.length; i++) {
                postsData = data[i];
                var post = new Post(postsData.body, postsData.id, postsData.title, postsData.userId);
                posts.push(post);
                addPostToBee(post);
            }

            sendRequest(commentsUrl, getCommentsComplete);

        } else {
            console.log('error');
        }
         //console.log(bees);
    }

    // agregar los post a los bees
    function addPostToBee(post){
        bees.forEach(bee => {

            if (bee.id === post.userId) {
                bee.addPost(post);
            }
        });
    }

    // extraer los comments de el url

    function getCommentsComplete(e){

        var request = e.target;

        if (request.status === 200) {

            //console.log(request.responseText);
            var data = JSON.parse(request.responseText);
            //console.log(data);

            for (let i = 0; i < data.length; i++) {
                commentData = data[i];    
                var comment = new Comment( commentData.body,  commentData.email,  commentData.id,  commentData.name,  commentData.postId);
                //console.log(comment);  
                addCommentToPost(comment);      
            }

        } else {
            console.log('error');
        }

        function addCommentToPost(comment) {

            posts.forEach(post => {
    
                if (post.id === comment.postId) {
                    post.addComment(comment);
                }
            });    
        }
        console.log(posts);
    }

}