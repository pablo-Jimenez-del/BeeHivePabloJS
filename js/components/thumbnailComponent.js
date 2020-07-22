class ThumbnailComponent extends Component{
    constructor(parent, model){
        super(parent, model);
        this.model = model;
        this.container.classList.add('thumbnailComponent');

        this.img = document.createElement('img');
        this.img.src = model.thumbnailUrl;
        this.img.classList.add('thumbnail');
        this.container.appendChild(this.img);

        this.title = document.createElement('h3');
        this.title.innerHTML = this.model.title;
        this.container.appendChild(this.title);

        this.container.onclick = this.onThumbnailClick.bind(this);
    }

    onThumbnailClick(e) {
        AppManager.getInstance().uiManager.showImage(this.model);
    }
}