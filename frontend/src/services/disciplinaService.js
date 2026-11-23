import API_URL, { enviarRequisicao } from "./api.js";

let listar = async function () {
  return await enviarRequisicao(
    `${API_URL}/disciplinas`,
    { method: "GET" },
    "Não foi possível carregar as disciplinas."
  );
};

let buscarPorId = async function (id) {
  return await enviarRequisicao(
    `${API_URL}/disciplinas/${id}`,
    { method: "GET" },
    "Não foi possível buscar a disciplina."
  );
};

let cadastrar = async function (disciplina) {
  return await enviarRequisicao(
    `${API_URL}/disciplinas`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(disciplina),
    },
    "Não foi possível realizar o cadastro. Verifique os dados e tente novamente."
  );
};

let alterar = async function (id, disciplina) {
  return await enviarRequisicao(
    `${API_URL}/disciplinas/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(disciplina),
    },
    "Não foi possível atualizar a disciplina. Verifique os dados e tente novamente."
  );
};

let excluir = async function (id) {
  return await enviarRequisicao(
    `${API_URL}/disciplinas/${id}`,
    { method: "DELETE" },
    "Não foi possível remover a disciplina."
  );
};
export { listar, buscarPorId, cadastrar, alterar, excluir };
