class PostsComponent extends Component {
  constructor(parent) {
    super(parent);
    this.container.id = "postsComponent";
    this.container.classList.add("postsComponent");
    this.container.classList.add("container-fluid");
    this.container.classList.add("col-sm-3");
    this.bee = null;
  }

  showBeePosts(bee, resetPosition) {
    if (resetPosition) {
      this.container.scrollTo(0, 0);
    }
    this.container.innerHTML = "";
    bee.posts.forEach((post) => {
      var postComponent = new PostComponent(this.container, post);
    });
  }
}
