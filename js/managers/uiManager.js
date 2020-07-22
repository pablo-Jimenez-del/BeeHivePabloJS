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
    this.appComponent.loaderComponent.hide();
    this.appComponent.beesComponent.addBees(this.appManager.dataManager.bees);
  }

  //Refresca el postComponent
  refreshPostsComponent(beeComponent, resetPosition) {
    //le dice el appComponent que muestre los posts del bee  en el postComponent
    this.beeComponentSelected = beeComponent;
    this.appComponent.postsComponent.showBeePosts(beeComponent.model,resetPosition);
    this.appComponent.albumsComponent.showBeePhotos(beeComponent.model, resetPosition);
  }

  hideCommentForm() {
    this.appComponent.commentFormComponent.hide();
  }

  addNewComment(title, body) {
    var comment = new PostComment(
    this.postReceivingComment.comments.length,this.postReceivingComment.id,title,body,AppManager.getInstance().owner.email);
    this.postReceivingComment.addComment(comment);
    this.refreshPostsComponent(this.beeComponentSelected, false);
    this.appComponent.commentFormComponent.hide();
  }
  showCommentForm(post) {
    this.postReceivingComment = post;
    this.appComponent.commentFormComponent.show();
  }

  showImage(photo){
    this.appComponent.photoComponent.showImage(photo);
  }

  hideImage(){
    this.appComponent.photoComponent.hide();
  }

}
