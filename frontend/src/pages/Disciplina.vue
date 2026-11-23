<script setup>
import { ref, computed, onMounted } from 'vue';
import * as disciplinaService from '../services/disciplinaService';
import * as cursoService from '../services/cursoService';
import * as professorService from '../services/professorService';
import Modal from '../components/Modal.vue';
import Notificacao from '../components/Notificacao.vue';
import CampoBusca from '../components/CampoBusca.vue';

const disciplinas = ref([]);
const carregando = ref(false);

const cursos = ref([]);
const professores = ref([]);

const filtro = ref("");

const disciplinasFiltradas = computed(function () {
  const texto = filtro.value.trim().toLowerCase();

  return disciplinas.value.filter(function (disciplina) {
    return disciplina.nome.toLowerCase().includes(texto);
  });
});

const modalFormularioAberto = ref(false);

const formulario = ref({
  id: null,
  nome: "",
  cargaHoraria: "",
  curso: "",
  professor: ""
});

const modalRemoverAberto = ref(false);
const disciplinaParaRemover = ref({ id: null, nome: "" });

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

let carregarDisciplinas = async function () {

  carregando.value = true;

  try {

    disciplinas.value = await disciplinaService.listar();

  } catch (erro) {

    mostrarNotificacao(erro.message, "erro");

  } finally {

    carregando.value = false;

  }

};

let carregarOpcoes = async function () {

  try {

    cursos.value = await cursoService.listar();
    professores.value = await professorService.listar();

  } catch (erro) {

    mostrarNotificacao(erro.message, "erro");

  }

};

let abrirCadastro = function () {

  formulario.value = {
    id: null,
    nome: "",
    cargaHoraria: "",
    curso: "",
    professor: ""
  };

  modalFormularioAberto.value = true;

};

let abrirEdicao = async function (item) {

  try {

    const disciplina = await disciplinaService.buscarPorId(item.id);

    formulario.value = {
      id: disciplina.id,
      nome: disciplina.nome,
      cargaHoraria: disciplina.cargaHoraria,
      curso: disciplina.cursoId,
      professor: disciplina.professorId
    };

    modalFormularioAberto.value = true;

  } catch (erro) {

    mostrarNotificacao(erro.message, "erro");

  }

};

let fecharFormulario = function () {
  modalFormularioAberto.value = false;
};

let validarFormulario = function () {

  if (formulario.value.nome.trim() === "") {
    return "Informe o nome da disciplina.";
  }

  if (!formulario.value.curso) {
    return "Selecione o curso.";
  }

  if (!formulario.value.professor) {
    return "Selecione o professor.";
  }

  if (!formulario.value.cargaHoraria || Number(formulario.value.cargaHoraria) <= 0) {
    return "Informe uma carga horária maior que zero.";
  }

  return "";

};

let salvarDisciplina = async function () {

  const problema = validarFormulario();

  if (problema) {
    mostrarNotificacao(problema, "alerta");
    return;
  }

  const dados = {
    nome: formulario.value.nome,
    cargaHoraria: Number(formulario.value.cargaHoraria),
    curso: formulario.value.curso,
    professor: formulario.value.professor
  };

  try {

    let mensagem = "";

    if (formulario.value.id) {

      await disciplinaService.alterar(formulario.value.id, dados);
      mensagem = "Disciplina atualizada com sucesso!";

    } else {

      await disciplinaService.cadastrar(dados);
      mensagem = "Disciplina cadastrada com sucesso!";

    }

    fecharFormulario();
    mostrarNotificacao(mensagem, "sucesso");

    await carregarDisciplinas();

  } catch (erro) {

    fecharFormulario();
    mostrarNotificacao(erro.message, "erro");

  }

};

let abrirRemocao = function (disciplina) {

  disciplinaParaRemover.value = disciplina;
  modalRemoverAberto.value = true;

};

let fecharRemocao = function () {
  modalRemoverAberto.value = false;
};

let confirmarRemocao = async function () {

  try {

    await disciplinaService.excluir(disciplinaParaRemover.value.id);

    fecharRemocao();
    mostrarNotificacao("Disciplina removida com sucesso!", "sucesso");

    await carregarDisciplinas();

  } catch (erro) {

    fecharRemocao();
    mostrarNotificacao(erro.message, "erro");

  }

};

onMounted(() => {
  carregarDisciplinas();
  carregarOpcoes();
});
</script>

<template>

  <section class="content">
    <div class="page-intro">
      <div>
        <h2>Lista de disciplinas</h2>
        <p>Gerencie as disciplinas vinculadas aos cursos.</p>
      </div><a class="button button-primary" href="#" @click.prevent="abrirCadastro"><span class="plus">+</span>Nova disciplina</a>
    </div>
    <div class="summary-row">
      <div class="summary-card">
        <div class="summary-icon">▤</div>
        <div><span>Disciplinas cadastradas</span><strong>{{ disciplinas.length }}</strong></div>
      </div>
      <div class="summary-note"><span class="status-dot"></span>Dados carregados da API</div>
    </div>
    <div class="table-card">
      <div class="table-toolbar">
        <div><strong>Todos os registros</strong><span>Consulte e gerencie disciplinas</span></div>
        <CampoBusca v-model="filtro" placeholder="Buscar disciplina por nome" />
      </div>
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Disciplina</th>
              <th>Carga horária</th>
              <th>Curso</th>
              <th>Professor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="carregando">
              <td colspan="6">Carregando disciplinas...</td>
            </tr>

            <tr v-else-if="disciplinas.length === 0">
              <td colspan="6">Nenhuma disciplina cadastrada.</td>
            </tr>

            <tr v-else-if="disciplinasFiltradas.length === 0">
              <td colspan="6">Nenhuma disciplina encontrada para "{{ filtro }}".</td>
            </tr>

            <tr v-for="item in disciplinasFiltradas" :key="item.id">
              <td>#{{ item.id }}</td>

              <td>
                <div class="person-cell">
                  <div class="person-avatar">
                    {{ item.nome.substring(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <span class="person-name">{{ item.nome }}</span>
                  </div>
                </div>
              </td>

              <td>{{ item.cargaHoraria }} horas</td>

              <td>{{ item.curso }}</td>

              <td>{{ item.professor }}</td>

              <td>
                <div class="actions">
                  <a class="action-button" href="#" title="Editar" @click.prevent="abrirEdicao(item)">✎</a>
                  <a class="action-button delete" href="#" title="Remover" @click.prevent="abrirRemocao(item)">⌫</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <span>Exibindo {{ disciplinasFiltradas.length }} de {{ disciplinas.length }} registros</span>
        <span>Dados carregados do sistema</span>
      </div>
    </div>
  </section>

  <Modal
    :titulo="formulario.id ? 'Editar disciplina' : 'Nova disciplina'"
    :etiqueta="formulario.id ? 'EDITAR REGISTRO' : 'NOVO CADASTRO'"
    :descricao="formulario.id ? 'Altere as informações da disciplina selecionada.' : 'Preencha os campos abaixo para adicionar um registro.'"
    :aberto="modalFormularioAberto"
    @fechar="fecharFormulario"
  >
    <!-- novalidate desliga o balão do navegador; a conferência é feita no validarFormulario -->
    <form novalidate @submit.prevent="salvarDisciplina">
      <div class="form-fields">
        <div class="field full">
          <label for="disciplina-nome">Nome da disciplina</label>
          <input id="disciplina-nome" type="text" v-model="formulario.nome"
            placeholder="Ex.: Programação para Internet" required>
        </div>

        <div class="field">
          <label for="disciplina-curso">Curso</label>
          <select id="disciplina-curso" v-model="formulario.curso" required>
            <option value="" disabled>Selecione...</option>
            <option v-for="curso in cursos" :key="curso.id" :value="curso.id">
              {{ curso.nome }}
            </option>
          </select>
        </div>

        <div class="field">
          <label for="disciplina-professor">Professor</label>
          <select id="disciplina-professor" v-model="formulario.professor" required>
            <option value="" disabled>Selecione...</option>
            <option v-for="professor in professores" :key="professor.id" :value="professor.id">
              {{ professor.nome }}
            </option>
          </select>
        </div>

        <div class="field">
          <label for="disciplina-carga">Carga horária (h)</label>
          <input id="disciplina-carga" type="number" v-model="formulario.cargaHoraria" placeholder="Ex.: 80"
            min="1" required>
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
    :descricao="`Deseja remover a disciplina ${disciplinaParaRemover.nome}? Esta ação não pode ser desfeita.`"
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
