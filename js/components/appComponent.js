//Este es el marco donde contendra todos los componentes y donde los agrego
class AppComponent extends Component{
    constructor(parent){
        super(parent);
        this.container.id = 'appComponent';
        this.container.classList.add('appComponent');
        this.headerComponent = new HeaderComponent(this.container);
        this.loaderComponent = new LoadingComponent(this.container);
        this.beesComponent = new BeesComponent(this.container);
        this.postsComponent = new PostsComponent(this.container);
        this.albumsComponent = new AlbumComponent(this.container);
        this.todosComponent = new TodosComponent(this.container);
        this.commentFormComponent = new CommentFormComponent(this.container);
        this.photoComponent = new PhotoComponent(this.container);
    }
}