class LoadingComponent extends Component {
  constructor(parent) {
    super(parent);
    this.container.id = "loadingComponent";
    this.container.classList.add("loadingComponent");


    this.loader = document.createElement('div');
    this.loader.classList.add('loader');
    this.container.appendChild(this.loader);
    // -100 para que se vea saliendo de la pantalla
    this.loader.style.left = '-100px';


    this.tween = gsap.to(this.loader, {x:window.innerWidth + 100, duration:2 , ease: "circ.inOut", repeat: -1})


    
    var loadingTitle = document.createElement("p");
    loadingTitle.innerHTML = "Cargando..";
    this.container.appendChild(loadingTitle);

    /*Cargar SVG JS
    var xhr = new XMLHttpRequest();
    xhr.open("GET","my.svg",false);
    xhr.overrideMimeType("image/svg+xml");
    xhr.onload = (e) => {
    this.loader.appendChild(xhr.responseXML.documentElement);
}
    xhr.send(""); */
  }

  hide(){
    this.tween.kill();
    this.container.style.display = 'none';
  }
  show(){
    this.container.style.display = 'block';
  }
}
