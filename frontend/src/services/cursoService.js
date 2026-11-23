import API_URL, { enviarRequisicao } from "./api.js";

let listar = async function () {
  return await enviarRequisicao(
    `${API_URL}/cursos`,
    { method: "GET" },
    "Não foi possível carregar os cursos."
  );
};

let buscarPorId = async function (id) {
  return await enviarRequisicao(
    `${API_URL}/cursos/${id}`,
    { method: "GET" },
    "Não foi possível buscar o curso."
  );
};

let cadastrar = async function (curso) {
  return await enviarRequisicao(
    `${API_URL}/cursos`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso),
    },
    "Não foi possível realizar o cadastro. Verifique os dados e tente novamente."
  );
};

let alterar = async function (id, curso) {
  return await enviarRequisicao(
    `${API_URL}/cursos/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(curso),
    },
    "Não foi possível atualizar o curso. Verifique os dados e tente novamente."
  );
};

let excluir = async function (id) {
  return await enviarRequisicao(
    `${API_URL}/cursos/${id}`,
    { method: "DELETE" },
    "Não foi possível remover o curso."
  );
};

export { listar, buscarPorId, cadastrar, alterar, excluir };
