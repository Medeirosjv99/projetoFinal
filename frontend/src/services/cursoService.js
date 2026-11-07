import API_URL from "./api.js";

let listar = async function () {
  const resposta = await fetch(`${API_URL}/cursos`);

  if (!resposta.ok) {
    throw new Error("Erro ao listar cursos");
  }

  return await resposta.json();
};

let buscarPorId = async function (id) {
  const resposta = await fetch(`${API_URL}/cursos/${id}`);

  if (!resposta.ok) {
    throw new Error("Erro ao buscar curso");
  }

  return await resposta.json();
};

let cadastrar = async function (curso) {
  const resposta = await fetch(`${API_URL}/cursos`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(curso),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao cadastrar curso");
  }

  return await resposta.json();
};

let alterar = async function (id, curso) {
  const resposta = await fetch(`${API_URL}/cursos/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(curso),
  });

  if (!resposta.ok) {
    throw new Error("Erro ao alterar curso");
  }

  return await resposta.json();
};

let excluir = async function (id) {
  const resposta = await fetch(`${API_URL}/cursos/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Erro ao excluir curso");
  }

  return await resposta.json();
};

export { listar, buscarPorId, cadastrar, alterar, excluir };
