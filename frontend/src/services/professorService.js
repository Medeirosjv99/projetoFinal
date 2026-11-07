import API_URL from "./api.js";

let listar = async function () {
  const resposta = await fetch(`${API_URL}/Professor`);

  if (!resposta.ok) {
    throw new Error("Erro ao listar as disciplina");
  }

  return await resposta.json();
};

let buscarPorId = async function (id) {
  const resposta = await fetch(`${API_URL}/Professor/${id}`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar as disciplina");
  }

  return await resposta.json();
};

let cadastrar = async function (disciplina) {
  const resposta = await fetch(`${API_URL}/Professor`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(disciplina),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar disciplina");
  }

  return await resposta.json();
};

let alterar = async function (id, disciplina) {
  const resposta = await fetch(`${API_URL}/Professor/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(disciplina),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao alterar disciplina");
  }

  return await resposta.json();
};

let excluir = async function (id) {
  const resposta = await fetch(`${API_URL}/Professor/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Erro ao excluir disciplina");
  }

  return await resposta.json();
};

export { listar, buscarPorId, cadastrar, alterar, excluir };
