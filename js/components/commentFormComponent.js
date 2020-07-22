class CommentFormComponent extends Component {
  constructor(parent) {
    super(parent);
    this.container.classList.add("commentFormComponent");

    this.formBackground = document.createElement("div");
    this.container.appendChild(this.formBackground);
    this.formBackground.classList.add("formBackground");

    this.title = document.createElement("input");
    this.title.id = "inputTitleForm";
    this.title.classList.add("titleInput");
    this.title.placeholder = "Titulo";
    this.formBackground.appendChild(this.title);

    this.body = document.createElement("textarea");
    this.body.placeholder = "Comentario";
    this.body.classList.add("bodyTextarea");
    this.formBackground.appendChild(this.body);
    this.body.id = "textareaForm";

    this.cancelBtn = document.createElement("button");
    this.cancelBtn.innerHTML = "Cancelar";
    this.formBackground.appendChild(this.cancelBtn);
    this.cancelBtn.classList.add("cancelBtn");
    this.cancelBtn.onclick = this.onCancelButton.bind(this);

    this.enviarBtn = document.createElement("button");
    this.enviarBtn.innerHTML = "Enviar";
    this.formBackground.appendChild(this.enviarBtn);
    this.enviarBtn.classList.add("enviarBtn");
    this.enviarBtn.onclick = this.onEnviarButton.bind(this);

    //No se muestra el boton
    this.hide();
  }

  hide() {
    this.container.style.display = "none";
  }
  show() {
    this.container.style.display = "flex";
  }

  onCancelButton(e) {
    AppManager.getInstance().uiManager.hideCommentForm(null, null);
  }

  onEnviarButton(e) {
    var title = this.title.value;
    var body = this.body.value;

    var inputTitleForm = document.getElementById("inputTitleForm");
    var textareaForm = document.getElementById("textareaForm");

    var formTitle = inputTitleForm.value;
    var formBody = textareaForm.value;

    if (formTitle == "") {
      Swal.fire({
        icon: "warning",
        title: "El titulo está vacío",
      });
      return false;
    } else if (formBody == "") {
      Swal.fire({
        icon: "warning",
        title: "El comentario está vacío",
      });
      return false;
    } else {
      Swal.fire({
        icon: "success",
        title: "Comentario añadido",
      });
      document.getElementById("inputTitleForm").value = "";
      document.getElementById("textareaForm").value = "";
    }
    AppManager.getInstance().uiManager.addNewComment(title, body);
  }
}
