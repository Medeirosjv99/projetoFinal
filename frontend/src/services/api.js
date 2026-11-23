const API_URL = "http://localhost:3000";

let enviarRequisicao = async function (url, opcoes, mensagemErroPadrao) {
  let resposta;

  try {

    resposta = await fetch(url, opcoes);

  } catch (erro) {

    throw new Error("Não foi possível conectar ao servidor. Verifique se a API está rodando.");

  }

  let dados = null;
  try {

    dados = await resposta.json();

  } catch (erro) {

    dados = null;

  }

  if (!resposta.ok) {
    if (dados && dados.mensagem) {
      throw new Error(dados.mensagem);
    }
    throw new Error(mensagemErroPadrao);

  }
  return dados;
};

export default API_URL;
export { enviarRequisicao };
