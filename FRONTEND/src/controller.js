import { view } from "./view/view.js";
import { Usuario } from "./model/usuario.model.js";
import { dataService } from "./api/data.service.js";

let data = [];
const submitType = { NEW: 0, UPDATE: 1 };
const nullUser = new Usuario("", null, "", "")
let submitState = submitType.NEW;
let currentId = null;

const loadData = async () => {
  const temp = await dataService.carregarDados();

  data = temp.map(
    (usuario) =>
      new Usuario(usuario.nome, usuario.idade, usuario.login, usuario.senha)
  );

  view.update(data, nullUser);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const user = new Usuario(nome.value, idade.value, login.value, senha.value);
  if (submitState == submitType.NEW) {
    addUser(user);
  } else if (submitState == submitType.UPDATE) {
    updateUser(currentId, user);
    submitState = submitType.NEW;
    btnSub.innerText = "Save";
  }
  view.update(data, nullUser);
};

//FUNÇÕES DE ADICIONAR, ATUALIZAR E REMOVER
const addUser = (newUser) => {
  data.push(newUser);
  dataService.salvarDados(data);
};

const updateUser = (index, userToUpdate) => {
  data[index] = userToUpdate;
};

const deletUser = (index) => {
  data.splice(index, 1);
};
//FIM FUNÇÕES CRUD

const getFormInputs = ()=>{
return new Usuario(nome.value, idade.value, login.value, senha.value)
}

const handleClick = (event)=>{
  currentId = event.target.closest("tr").id.split("")[4];
  if (event.type === "click") {
    const confimarEditar = window.confirm(
      `Clicou com o botão esquerdo, e o ${data[currentId]
        .getNome()
        .toUpperCase()} será carregado para edição`
    );
  
    if (confimarEditar) {
      view.updateForm(data[currentId]);
      submitState = submitType.UPDATE;
      btnSub.innerText = "Update";
    }
    
  } else if (event.type === "contextMenu") {
    event.preventDefault();
    if (event.button == 2) {
      const confirmarDelecao = window.confirm(
        `Clicou com o botão direito, e o ${data[currentId]
          .getNome()
          .toUpperCase()} será deletado`
      );
  
      if (confirmarDelecao) {
        deletUser(currentId);
        view.update(data, nullUser);
      }
    }
  }
}

const setEvents = () => {
  const form = document.getElementById("signForm");
  form.addEventListener("submit", handleSubmit);
  const userList = document.getElementById("users-result");
  userList.addEventListener("click", handleClick);
  userList.addEventListener("contextmenu", handleClick);
};



const controller = {
  run: () => {
    view.render();
    setEvents();
    window.onload = () => {
      loadData();
    };
  },
};

export { controller };
