import API_URL, { enviarRequisicao } from "./api.js";

let listar = async function () {
  return await enviarRequisicao(
    `${API_URL}/professores`,
    { method: "GET" },
    "Não foi possível carregar os professores."
  );
};

let buscarPorId = async function (id) {
  return await enviarRequisicao(
    `${API_URL}/professores/${id}`,
    { method: "GET" },
    "Não foi possível buscar o professor."
  );
};

let cadastrar = async function (professor) {
  return await enviarRequisicao(
    `${API_URL}/professores`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(professor),
    },
    "Não foi possível realizar o cadastro. Verifique os dados e tente novamente."
  );
};

let alterar = async function (id, professor) {
  return await enviarRequisicao(
    `${API_URL}/professores/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(professor),
    },
    "Não foi possível atualizar o professor. Verifique os dados e tente novamente."
  );
};

let excluir = async function (id) {
  return await enviarRequisicao(
    `${API_URL}/professores/${id}`,
    { method: "DELETE" },
    "Não foi possível remover o professor."
  );
};
export { listar, buscarPorId, cadastrar, alterar, excluir };
