//Este es cada componente , osea cada div
class BeesComponent extends Component {
  constructor(parent) {
    super(parent);
    this.container.classList.add("beesComponent");
    this.container.classList.add("container-fluid");
    this.container.classList.add("col-sm-3");
    this.container.id = "beesComponent";
  }
  //Metodo para agregar a los usuarios
  addBees(bees) {
    bees.forEach((bee, index) => {
      var beeComponent = new BeeComponent(this.container, bee);
      this.addChild(beeComponent);
      if (index === 0) {
        AppManager.getInstance().uiManager.refreshPostsComponent(beeComponent);
      }
    });
  }
}
