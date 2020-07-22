class DataManager {
  constructor(appManager) {
    this.appManager = appManager;
    this.beesUrl = "https://beehive-270a2.firebaseio.com/data/users.json";
    this.postsUrl = "https://beehive-270a2.firebaseio.com/data/posts.json";
    this.commentsUrl =
      "https://beehive-270a2.firebaseio.com/data/comments.json";
    this.albumUrl = "https://beehive-270a2.firebaseio.com/data/albums.json";
    this.todosUrl = "https://beehive-270a2.firebaseio.com/data/todos.json";
    this.photosUrl = "https://beehive-270a2.firebaseio.com/data/photos.json";
    this.bees = [];
  }

  start() {
    //this.appManager.uiManager.showLoading();
    //Simplificado las url
    this.sendRequest(this.beesUrl, this.getBeesComplete.bind(this));
  }

  sendRequest(url, callback) {
    var request = new XMLHttpRequest();
    request.addEventListener("load", callback);
    request.open("GET", url);
    request.send();
  }

  getBeesComplete(e) {
    var request = e.target;

    if (request.status === 200) {
      var data = JSON.parse(request.responseText);

      for (let i = 0; i < data.length; i++) {
        var beeData = data[i];
        var company = new Company(
          beeData.company.bs,
          beeData.company.catchPhrase,
          beeData.company.name
        );
        var geo = new Geo(beeData.address.geo.lat, beeData.address.geo.lng);
        var address = new Address(
          beeData.address.city,
          geo,
          beeData.address.street,
          beeData.address.suite,
          beeData.address.zipcode
        );
        var bee = new Bee(
          beeData.id,
          beeData.name,
          beeData.email,
          beeData.phone,
          beeData.username,
          beeData.website,
          address,
          company,
          beeData.image,
          beeData.owner
        );
        //Usuario principal
        if (bee.owner) {
          AppManager.getInstance().owner = bee;
        }

        this.bees.push(bee);
      }
      //Se extrae los post cuando haya ya parseado todos los bees
      this.sendRequest(this.postsUrl, this.getPostsComplete.bind(this));
    } else {
      console.log("Error on request: bees");
    }
  }

  getPostsComplete(e) {
    var request = e.target;
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        var postData = data[i];
        var post = new Post(
          postData.id,
          postData.body,
          postData.title,
          postData.userId
        );
        //Se agrega el metodo cada vez que se agrega un post
        this.addPostToBee(post);
      }
      //Se agrega los comentarios cuando ya se haya agregado el post
      this.sendRequest(this.commentsUrl, this.getCommentsComplete.bind(this));
    } else {
      console.log("Error on request: posts");
    }
  }

  addPostToBee(post) {
    this.bees.forEach((bee) => {
      if (bee.id === post.userId) {
        bee.addPost(post);
        return;
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
        var comment = new PostComment(
          commentData.id,
          commentData.postId,
          commentData.name,
          commentData.body,
          commentData.email
        );
        //Agrego el comentario al post
        this.addCommentToBeePost(comment);
      }
      this.sendRequest(this.albumUrl, this.getAlbumsComplete.bind(this));
    } else {
      console.log("Error on request: comments");
    }
  }

  // agregar los comentarios a los post
  addCommentToBeePost(comment) {
    this.bees.forEach((bee) => {
      bee.posts.forEach((post) => {
        post.addComment(comment);
      });
    });
  }

  //extraer los TODOS
  getTodosComplete(e) {
    var request = e.target;
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        const todoData = data[i];
        var todo = new Todo(
          todoData.id,
          todoData.title,
          todoData.userId,
          todoData.completed
        );
        this.addTodoToBee(todo);
      }
      console.log(this.bees);
      this.appManager.uiManager.showUI();
    } else {
      console.log("Error on request: todos");
    }
  }

  //agrega los TODOS al bee
  addTodoToBee(todo) {
    this.bees.forEach((bee) => {
      if (bee.id === todo.userId) {
        bee.addTodo(todo);
        return;
      }
    });
  }

  //ALBUM EXTRAER
  getAlbumsComplete(e) {
    var request = e.target;
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        var albumData = data[i];
        var album = new Album(albumData.id, albumData.title, albumData.userId);
        this.addAlbumToBee(album);
      }
      this.sendRequest(this.photosUrl, this.getPhotoComplete.bind(this));
    } else {
      console.log("Error on request: album");
    }
  }

  //Album agregar al BEE
  addAlbumToBee(album) {
    this.bees.forEach((bee) => {
      if (album.userId === bee.id) {
        bee.addAlbum(album);
        return;
      }
    });
  }

  // extraer fotos url
  getPhotoComplete(e) {
    var request = e.target;
    if (request.status === 200) {
      var data = JSON.parse(request.responseText);
      for (let i = 0; i < data.length; i++) {
        var photoData = data[i];
        var photo = new Photo(
          photoData.id,
          photoData.albumId,
          photoData.title,
          photoData.thumbnailUrl,
          photoData.url
        );
        //Agrego las fotos al album
        this.addPhotoToAlbum(photo);
      }
      this.sendRequest(this.todosUrl, this.getTodosComplete.bind(this));
    } else {
      console.log("Error on request: photo");
    }
  }

  // agregar las fotos al album
  addPhotoToAlbum(photo) {
    this.bees.forEach((bee) => {
      bee.albums.forEach((album) => {
        if (album.id === photo.albumId) {
          album.addPhoto(photo);
        }
      });
    });
  }
}
