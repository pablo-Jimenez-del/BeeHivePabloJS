class PostComponent extends Component {
  constructor(parent, model) {
    super(parent);
    this.model = model;
    this.container.classList.add("postComponent");

    this.title = document.createElement("h2");
    this.title.innerHTML = this.model.title;
    this.title.classList.add("postTitle");
    this.container.appendChild(this.title);

    this.body = document.createElement("p");
    this.body.innerHTML = this.model.body;
    this.body.classList.add("postBody");
    this.container.appendChild(this.body);

    //Agregar comentarios debajo de los posts
    this.addCommentBtn = document.createElement("button");
    this.addCommentBtn.classList.add('addComentBtn');
    this.addCommentBtn.innerHTML = "Añadir Comentario";
    this.addCommentBtn.id = 'addCommentBtn';
    this.addCommentBtn.onclick = this.onAddCommentOnClick.bind(this);
    this.container.appendChild(this.addCommentBtn);

    this.model.comments.forEach((comment) => {
      var commentComponent = new CommentComponent(this.container, comment);
    });
  }


  onAddCommentOnClick(e) {
    AppManager.getInstance().uiManager.showCommentForm(this.model);
  }
}
