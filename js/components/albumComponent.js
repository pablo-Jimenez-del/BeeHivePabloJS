class AlbumComponent extends Component {
  constructor(parent, model) {
    super(parent);
    this.model = model;
    this.container.id = 'albumComponent';
    this.container.classList.add('albumComponent');
    this.container.classList.add("container-fluid");
    this.container.classList.add("col-sm-3");
  }
  showBeePhotos(bee, resetPosition) {
    if (resetPosition) {
      this.container.scrollTo(0, 0);
    }
    this.container.innerHTML = "";
    bee.albums.forEach((album) => {
      album.photos.forEach((photo) =>{
        var photoComponent = new ThumbnailComponent(this.container, photo);
      });
    });
  }
}
