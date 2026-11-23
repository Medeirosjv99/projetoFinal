<script setup>
import { ref, computed, onMounted } from 'vue';
import * as cursoService from '../services/cursoService';
import Modal from '../components/Modal.vue';
import Notificacao from '../components/Notificacao.vue';
import CampoBusca from '../components/CampoBusca.vue';

const cursos = ref([]);
const carregando = ref(false);

const filtro = ref("");
const cursosFiltrados = computed(function () {
  const texto = filtro.value.trim().toLowerCase();

  return cursos.value.filter(function (curso) {
    return curso.nome.toLowerCase().includes(texto);
  });
});

const modalFormularioAberto = ref(false);

const formulario = ref({
  id: null,
  nome: "",
  cargaHoraria: ""
});

const modalRemoverAberto = ref(false);
const cursoParaRemover = ref({ id: null, nome: "" });

const notificacao = ref({
  exibir: false,
  mensagem: "",
  tipo: "sucesso"
});

let temporizador = null;

let fecharNotificacao = function () {
  notificacao.value.exibir = false;
};

let mostrarNotificacao = function (mensagem, tipo) {
  notificacao.value = {
    exibir: true,
    mensagem: mensagem,
    tipo: tipo
  };

  clearTimeout(temporizador);
  temporizador = setTimeout(fecharNotificacao, 4000);
};

let carregarCursos = async function () {

  carregando.value = true;

  try {

    cursos.value = await cursoService.listar();

  } catch (erro) {

    mostrarNotificacao(erro.message, "erro");

  } finally {

    carregando.value = false;

  }

};

let abrirCadastro = function () {

  formulario.value = {
    id: null,
    nome: "",
    cargaHoraria: ""
  };

  modalFormularioAberto.value = true;

};

let abrirEdicao = function (curso) {

  formulario.value = {
    id: curso.id,
    nome: curso.nome,
    cargaHoraria: curso.cargaHoraria
  };

  modalFormularioAberto.value = true;

};

let fecharFormulario = function () {
  modalFormularioAberto.value = false;
};

let validarFormulario = function () {

  if (formulario.value.nome.trim() === "") {
    return "Informe o nome do curso.";
  }

  if (!formulario.value.cargaHoraria || Number(formulario.value.cargaHoraria) <= 0) {
    return "Informe uma carga horária maior que zero.";
  }

  return "";

};

let salvarCurso = async function () {

  const problema = validarFormulario();

  if (problema) {
    mostrarNotificacao(problema, "alerta");
    return;
  }

  const dados = {
    nome: formulario.value.nome,
    cargaHoraria: Number(formulario.value.cargaHoraria)
  };

  try {

    let mensagem = "";

    if (formulario.value.id) {

      await cursoService.alterar(formulario.value.id, dados);
      mensagem = "Curso atualizado com sucesso!";

    } else {

      await cursoService.cadastrar(dados);
      mensagem = "Curso cadastrado com sucesso!";

    }

    fecharFormulario();
    mostrarNotificacao(mensagem, "sucesso");

    await carregarCursos();

  } catch (erro) {

    fecharFormulario();
    mostrarNotificacao(erro.message, "erro");

  }

};

let abrirRemocao = function (curso) {

  cursoParaRemover.value = curso;
  modalRemoverAberto.value = true;

};

let fecharRemocao = function () {
  modalRemoverAberto.value = false;
};

let confirmarRemocao = async function () {

  try {

    await cursoService.excluir(cursoParaRemover.value.id);

    fecharRemocao();
    mostrarNotificacao("Curso removido com sucesso!", "sucesso");

    await carregarCursos();

  } catch (erro) {

    fecharRemocao();
    mostrarNotificacao(erro.message, "erro");

  }

};

onMounted(() => {
  carregarCursos();
});
</script>


<template>

  <section class="content">
    <div class="page-intro">
      <div>
        <h2>Lista de cursos</h2>
        <p>Gerencie os cursos ofertados pela instituição.</p>
      </div><a class="button button-primary" href="#" @click.prevent="abrirCadastro"><span class="plus">+</span>Novo curso</a>
    </div>
    <div class="summary-row">
      <div class="summary-card">
        <div class="summary-icon">▤</div>
        <div><span>Cursos cadastrados</span><strong>{{ cursos.length }}</strong></div>
      </div>
      <div class="summary-note"><span class="status-dot"></span>Dados carregados da API</div>
    </div>
    <div class="table-card">
      <div class="table-toolbar">
        <div><strong>Todos os registros</strong><span>Consulte e gerencie cursos</span></div>
        <CampoBusca v-model="filtro" placeholder="Buscar curso por nome" />
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Curso</th>
              <th>Carga horária</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>

            <tr v-if="carregando">
              <td colspan="4">Carregando cursos...</td>
            </tr>

            <tr v-else-if="cursos.length === 0">
              <td colspan="4">Nenhum curso cadastrado.</td>
            </tr>

            <tr v-else-if="cursosFiltrados.length === 0">
              <td colspan="4">Nenhum curso encontrado para "{{ filtro }}".</td>
            </tr>

            <tr v-for="curso in cursosFiltrados" :key="curso.id">

              <td>#{{ curso.id }}</td>

              <td>
                <div class="person-cell">
                  <div class="person-avatar">
                    {{ curso.nome.substring(0, 2).toUpperCase() }}
                  </div>

                  <div>
                    <span class="person-name">
                      {{ curso.nome }}
                    </span>
                  </div>
                </div>
              </td>

              <td>{{ curso.cargaHoraria }} horas</td>

              <td>
                <div class="actions">
                  <a class="action-button" href="#" title="Editar" @click.prevent="abrirEdicao(curso)">✎</a>
                  <a class="action-button delete" href="#" title="Remover" @click.prevent="abrirRemocao(curso)">⌫</a>
                </div>
              </td>

            </tr>

          </tbody>

        </table>
      </div>
      <div class="table-footer">
        <span>Exibindo {{ cursosFiltrados.length }} de {{ cursos.length }} registros</span>
        <span>Dados carregados do sistema</span>
      </div>
    </div>
  </section>

  <Modal
    :titulo="formulario.id ? 'Editar curso' : 'Novo curso'"
    :etiqueta="formulario.id ? 'EDITAR REGISTRO' : 'NOVO CADASTRO'"
    :descricao="formulario.id ? 'Altere as informações do curso selecionado.' : 'Preencha os campos abaixo para adicionar um registro.'"
    :aberto="modalFormularioAberto"
    @fechar="fecharFormulario"
  >
    <!-- novalidate desliga o balão do navegador; a conferência é feita no validarFormulario -->
    <form novalidate @submit.prevent="salvarCurso">

      <div class="form-fields">

        <div class="field full">
          <label for="curso-nome">Nome do curso</label>
          <input id="curso-nome" type="text" v-model="formulario.nome" placeholder="Ex.: Técnico em Informática"
            required>
        </div>

        <div class="field full">
          <label for="curso-carga">Carga horária</label>
          <input id="curso-carga" type="number" v-model="formulario.cargaHoraria" placeholder="Ex.: 1200" min="1"
            required>
        </div>

      </div>

      <div class="modal-footer">
        <a class="button button-secondary" href="#" @click.prevent="fecharFormulario">Cancelar</a>
        <button class="button button-primary" type="submit">
          {{ formulario.id ? 'Salvar alterações' : 'Salvar cadastro' }}
        </button>
      </div>

    </form>

    <!-- Com o modal aberto, o resto da página fica atrás do fundo escuro.
         Por isso o alerta é mostrado aqui dentro, para aparecer por cima. -->
    <Notificacao
      v-if="notificacao.exibir && modalFormularioAberto"
      :mensagem="notificacao.mensagem"
      :tipo="notificacao.tipo"
      @fechar="fecharNotificacao"
    />
  </Modal>

  <Modal
    titulo="Confirmar remoção"
    etiqueta="REMOVER REGISTRO"
    :descricao="`Deseja remover o curso ${cursoParaRemover.nome}? Esta ação não pode ser desfeita.`"
    :aberto="modalRemoverAberto"
    @fechar="fecharRemocao"
  >
    <div class="modal-footer">
      <a class="button button-secondary" href="#" @click.prevent="fecharRemocao">Cancelar</a>
      <a class="button button-danger" href="#" @click.prevent="confirmarRemocao">Confirmar remoção</a>
    </div>
  </Modal>

  <Notificacao
    v-if="notificacao.exibir && !modalFormularioAberto"
    :mensagem="notificacao.mensagem"
    :tipo="notificacao.tipo"
    @fechar="fecharNotificacao"
  />

</template>
