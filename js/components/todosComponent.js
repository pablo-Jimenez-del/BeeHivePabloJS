class TodosComponent extends Component {
  constructor(parent) {
    super(parent);
    this.container.id = "todosComponent";
    this.container.classList.add("container-fluid");
    this.container.classList.add("col-sm-3");
    this.container.classList.add("todosComponent");
  }
}
