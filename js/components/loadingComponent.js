class LoadingComponent extends Component {
  constructor(parent) {
    super(parent);
    this.container.id = "loadingComponent";
    this.container.classList.add("wrapper");


 

    this.bee = document.createElement("div");
    this.bee.classList.add("bee");
    this.container.appendChild(this.bee);

    this.beeBody = document.createElement("div");
    this.beeBody.classList.add("beeBody");
    this.bee.appendChild(this.beeBody);

    this.blink = document.createElement("div");
    this.blink.classList.add("blink");
    this.beeBody.appendChild(this.blink);

    this.boca = document.createElement("div");
    this.boca.classList.add("boca");
    this.beeBody.appendChild(this.boca);

    this.antena = document.createElement("div");
    this.antena.classList.add("antena");
    this.beeBody.appendChild(this.antena);

    this.beeLeft = document.createElement("div");
    this.beeLeft.classList.add("beeLeft");
    this.beeBody.appendChild(this.beeLeft);

    this.beeRight = document.createElement("div");
    this.beeRight.classList.add("beeRight");
    this.beeBody.appendChild(this.beeRight);

    this.sombra = document.createElement("div");
    this.sombra.classList.add("sombra");
    this.container.appendChild(this.sombra);

    /*this.loader = document.createElement('div');
    this.loader.classList.add('loader');
    this.container.appendChild(this.loader);
    // -100 para que se vea saliendo de la pantalla
    //this.loader.style.left = '-100px';*/

    //this.tween = gsap.to(this.loader, {x:window.innerWidth + 100, duration:2 , ease: "circ.inOut", repeat: -1})


    /*Cargar SVG JS
    var xhr = new XMLHttpRequest();
    xhr.open("GET","my.svg",false);
    xhr.overrideMimeType("image/svg+xml");
    xhr.onload = (e) => {
    this.loader.appendChild(xhr.responseXML.documentElement);
}
    xhr.send(""); */
  }

  hide() {
    //this.tween.kill();
    this.container.style.display = "none";
  }
  show() {
    this.container.style.display = "block";
  }
}
