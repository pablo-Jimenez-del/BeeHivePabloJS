class CommentComponent extends Component {
  constructor(parent, model) {
    super(parent);
    this.model = model;
    this.container.classList.add("commentComponent");

    this.name = document.createElement("p");
    this.name.innerHTML = this.model.name;
    this.name.classList.add("commentName");
    this.container.appendChild(this.name);

    this.body = document.createElement("p");
    this.body.innerHTML = this.model.body;
    this.body.classList.add("commentBody");
    this.container.appendChild(this.body);

    this.email = document.createElement("p");
    this.email.innerHTML = this.model.email;
    this.email.classList.add("commentEmail");
    this.container.appendChild(this.email);
  }
}
