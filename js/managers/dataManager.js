class DataManager {
    constructor(appManager) {
        this.bees = [];
        this.posts = [];
        this.todos = [];
        this.albums = [];
        this.beesUrl = 'https://beehive-270a2.firebaseio.com/data/users.json';
        this.postsUrl = 'https://beehive-270a2.firebaseio.com/data/posts.json';
        this.commentsUrl = 'https://beehive-270a2.firebaseio.com/data/comments.json';
        this.albumsUrl = 'https://beehive-270a2.firebaseio.com/data/albums.json';
        this.photosUrl = 'https://beehive-270a2.firebaseio.com/data/photos.json';
        this.todosUrl = 'https://beehive-270a2.firebaseio.com/data/todos.json';
        this.appManager = appManager;

    }
    start() {
        //Simplificado las url
        this.sendRequest(this.beesUrl, this.getBeesComplete.bind(this));


    }
    sendRequest(url, callback) {
        var request = new XMLHttpRequest();
        request.addEventListener('load', callback);
        request.open('GET', url);
        request.send();
    }

    getBeesComplete(e) {
        var request = e.target;

        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            //TODO: PARSEAR  OBJTOS ADDRESS, GEO , COMPANY

            for (let i = 0; i < data.length; i++) {
                var beeData = data[i];
                // A PARSEARLO EN MODO DE OBJEETOS
                var bee = new Bee(beeData.id, beeData.name, beeData.email, beeData.phone,
                    beeData.username, beeData.website, beeData.address, beeData.company, beeData.geo);
                bee.address = JSON.parse(request.responseText);
                bee.company = JSON.parse(request.responseText);
                bee.geo = JSON.parse(request.responseText);
                this.bees.push(bee);
            }
            //Se extrae los post cuando haya ya parseado todos los bees
            this.sendRequest(this.postsUrl, this.getPostComplete.bind(this));
            //console.log(bees);
        } else {
            console.log('Hubo un error en el request');
        }
    }


    // extrae los Post del url
    getPostComplete(e) {
        var request = e.target;

        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                var postData = data[i];

                var post = new Post(postData.id, postData.body, postData.title, postData.userId);
                this.posts.push(post);
                //Se agrega el metodo cada vez que se agrega un post
                this.addPostToBee(post);
            }
            //Se agrega los comentarios cuando ya se haya agregado el post
            this.sendRequest(this.commentsUrl, this.getCommentsComplete.bind(this));
            //Se agrega los TODOS
            this.sendRequest(this.todosUrl, this.getTodosComplete.bind(this));
            //Agrego el album al bee
            this.sendRequest(this.albumsUrl, this.getAlbumComplete.bind(this));
            //Agrego las fotos al  album
            this.sendRequest(this.photosUrl, this.getPhotoComplete.bind(this));
            console.log(this.bees);

        } else {
            console.log('Hubo un error en el request');
        }
    }

    // agregar los post a los bees
    addPostToBee(post) {
        this.bees.forEach(bee => {
            if (bee.id === post.userId) {
                bee.addPost(post);
            }
        });
    }

    // extrae los comments de la url
    getCommentsComplete(e) {
        var request = e.target;

        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                var commentData = data[i];
                var comment = new Comment(commentData.body, commentData.email, commentData.id, commentData.name, commentData.postId);
                //Agrego el comentario al post
                this.addCommentToPost(comment);
            }


        } else {
            console.log('error al argar servidor');
        }
    }

    // agregar los comentarios a los post
    addCommentToPost(comment) {
        this.posts.forEach(post => {
            if (post.id === comment.postId) {
                post.addComment(comment);
            }
        });
    }

    //extraer los TODOS
    getTodosComplete(e) {
        var request = e.target;

        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                var todosData = data[i];
                var todo = new Todos(todosData.completed, todosData.id, todosData.title, todosData.userId);
                this.addTodoToBee(todo);

            }

        } else {
            console.log('Hubo un error en el request');
        }
    }

    //agrega los TODOS al bee
    addTodoToBee(todo) {
        this.bees.forEach(bee => {
            if (bee.id === todo.userId) {
                bee.addTodos(todo);
            }
        });
    }



    //ALBUM EXTRAER 
    getAlbumComplete(e) {
        var request = e.target;

        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                var albumData = data[i];
                var album = new Album(albumData.id, albumData.title, albumData.userId);
                //Agrega el album
                this.albums.push(album);
                this.addAlbumToBee(album);
            }


        } else {
            console.log('Hubo un error en el request');
        }
    }

    //Album agregar al BEE
    addAlbumToBee(album) {
        this.bees.forEach(bee => {
            if (bee.id === album.userId) {
                bee.addAlbum(album);
            }
        })
    }


    // extraer fotos url
    getPhotoComplete(e) {
        var request = e.target;

        if (request.status === 200) {
            var data = JSON.parse(request.responseText);
            for (let i = 0; i < data.length; i++) {
                var photoData = data[i];
                var photo = new Photo(photoData.albumId, photoData.id, photoData.id, photoData.thumbnailUrl, photoData.title, photoData.url);
                //Agrego las fotos al album
                this.addPhotoToAlbum(photo);

            };
        } else {
            console.log('error al argar servidor');
        }
    }

    // agregar las fotos al album
    addPhotoToAlbum(photo) {
        this.albums.forEach(album => {
            if (album.id === photo.albumId) {
                album.addPhoto(photo);
            }
        });
    }





}