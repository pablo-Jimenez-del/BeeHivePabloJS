//Controla toda la interfaz gráfica
class UIManager {
  constructor(appManager) {
    this.appManager = appManager;
    this.appComponent = new AppComponent(document.body);
    this.postReceivingComment = null;
    this.beeComponentSelected = null;
  }
  showLoading() {
    console.log("Cargando..");
  }
  showUI() {
    console.log("SHOW UI");
    //Loadding
    this.appComponent.loaderComponent.hide();
    //
    this.appComponent.beesComponent.addBees(this.appManager.dataManager.bees);
    //this.appComponent.albumsComponent.hide();

    //Me muestra el primer post de la persona
    this.refreshPostsComponent(AppManager.getInstance().dataManager.bees[0]);
  }

  //Refresca el postComponent
  refreshPostsComponent(bee, resetPosition) {
    //le dice el appComponent que muestre los posts del bee  en el postComponent
    this.appComponent.postsComponent.showBeePosts(bee)//model, resetPosition);
  }

  hideCommentForm() {
    this.appComponent.commentFormComponent.hide();
  }

  addNewComment(title,body) {
    var comment = new Comment(this.postReceivingComment.comments.length, this.postReceivingComment.id, title, body, AppManager.getInstance().owner.email);
    this.postReceivingComment.addComment(comment);
    //*Me dice que el posts esta null en el metodo ShowBeePost
   //this.refreshPostsComponent(this.beeComponentSelected, false)
    this.appComponent.commentFormComponent.hide();
  }
  showCommentForm(post) {
    this.postReceivingComment = post;
    this.appComponent.commentFormComponent.show();
  }
}
