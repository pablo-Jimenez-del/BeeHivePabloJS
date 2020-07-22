class Post {
  constructor(id, body, title, userId) {
    this.id = id;
    this.body = body;
    this.title = title;
    this.userId = userId;
    this.comments = [];
  }

  addComment(comment) {
    if (comment.postId === this.id) {
      //Preguntar que es el unshift, si es para girar un arreglo.. preguntar
      this.comments.unshift(comment);
    }
  }
}
