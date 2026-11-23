<script setup>
import { ref, computed, onMounted } from 'vue';
import * as professorService from '../services/professorService';
import Modal from '../components/Modal.vue';
import Notificacao from '../components/Notificacao.vue';
import CampoBusca from '../components/CampoBusca.vue';

const professores = ref([]);
const carregando = ref(false);

const filtro = ref("");

const professoresFiltrados = computed(function () {
    const texto = filtro.value.trim().toLowerCase();

    return professores.value.filter(function (professor) {
        return professor.nome.toLowerCase().includes(texto);
    });
});

const modalFormularioAberto = ref(false);

const formulario = ref({
    id: null,
    nome: "",
    email: ""
});

const modalRemoverAberto = ref(false);
const professorParaRemover = ref({ id: null, nome: "" });

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

let carregarProfessores = async function () {

    carregando.value = true;

    try {

        professores.value = await professorService.listar();

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
        email: ""
    };

    modalFormularioAberto.value = true;

};

let abrirEdicao = function (professor) {

    formulario.value = {
        id: professor.id,
        nome: professor.nome,
        email: professor.email
    };

    modalFormularioAberto.value = true;

};

let fecharFormulario = function () {
    modalFormularioAberto.value = false;
};

let salvarProfessor = async function () {

    const dados = {
        nome: formulario.value.nome,
        email: formulario.value.email
    };

    try {

        let mensagem = "";

        if (formulario.value.id) {

            await professorService.alterar(formulario.value.id, dados);
            mensagem = "Professor atualizado com sucesso!";

        } else {

            await professorService.cadastrar(dados);
            mensagem = "Professor cadastrado com sucesso!";

        }

        fecharFormulario();
        mostrarNotificacao(mensagem, "sucesso");

        await carregarProfessores();

    } catch (erro) {

        fecharFormulario();
        mostrarNotificacao(erro.message, "erro");

    }

};

let abrirRemocao = function (professor) {

    professorParaRemover.value = professor;
    modalRemoverAberto.value = true;

};

let fecharRemocao = function () {
    modalRemoverAberto.value = false;
};

let confirmarRemocao = async function () {

    try {

        await professorService.excluir(professorParaRemover.value.id);

        fecharRemocao();
        mostrarNotificacao("Professor removido com sucesso!", "sucesso");

        await carregarProfessores();

    } catch (erro) {

        fecharRemocao();
        mostrarNotificacao(erro.message, "erro");

    }

};

onMounted(() => {
    carregarProfessores();
});
</script>

<template>

    <section class="content">
        <div class="page-intro">
            <div>
                <h2>Lista de professores</h2>
                <p>Gerencie os professores cadastrados no sistema.</p>
            </div><a class="button button-primary" href="#" @click.prevent="abrirCadastro"><span class="plus">+</span>Novo
                professor</a>
        </div>
        <div class="summary-row">
            <div class="summary-card">
                <div class="summary-icon">▤</div>
                <div><span>Professores cadastrados</span><strong>{{ professores.length }}</strong></div>
            </div>
            <div class="summary-note"><span class="status-dot"></span>Dados carregados da API</div>
        </div>
        <div class="table-card">
            <div class="table-toolbar">
                <div><strong>Todos os registros</strong><span>Consulte e gerencie professores</span></div>
                <CampoBusca v-model="filtro" placeholder="Buscar professor por nome" />
            </div>
            <div class="table-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Professor</th>
                            <th>E-mail</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-if="carregando">
                            <td colspan="4">Carregando professores...</td>
                        </tr>

                        <tr v-else-if="professores.length === 0">
                            <td colspan="4">Nenhum professor cadastrado.</td>
                        </tr>

                        <tr v-else-if="professoresFiltrados.length === 0">
                            <td colspan="4">Nenhum professor encontrado para "{{ filtro }}".</td>
                        </tr>

                        <tr v-for="item in professoresFiltrados" :key="item.id">
                            <td>#{{ item.id }}</td>

                            <td>
                                <div class="person-cell">
                                    <div class="person-avatar">
                                        {{ item.nome.substring(0, 2).toUpperCase() }}
                                    </div>

                                    <div>
                                        <span class="person-name">
                                            {{ item.nome }}
                                        </span>
                                    </div>
                                </div>
                            </td>

                            <td>{{ item.email }}</td>

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
                <span>Exibindo {{ professoresFiltrados.length }} de {{ professores.length }} registros</span>
                <span>Dados carregados do sistema</span>
            </div>
        </div>
    </section>

    <Modal
        :titulo="formulario.id ? 'Editar professor' : 'Novo professor'"
        :etiqueta="formulario.id ? 'EDITAR REGISTRO' : 'NOVO CADASTRO'"
        :descricao="formulario.id ? 'Altere as informações do professor selecionado.' : 'Preencha os campos abaixo para adicionar um registro.'"
        :aberto="modalFormularioAberto"
        @fechar="fecharFormulario"
    >
        <form @submit.prevent="salvarProfessor">
            <div class="form-fields">
                <div class="field full">
                    <label for="professor-nome">Nome completo</label>
                    <input id="professor-nome" type="text" v-model="formulario.nome" placeholder="Ex.: Ana Martins"
                        required>
                </div>
                <div class="field full">
                    <label for="professor-email">E-mail institucional</label>
                    <input id="professor-email" type="email" v-model="formulario.email"
                        placeholder="nome@instituicao.edu.br" required>
                </div>
            </div>
            <div class="modal-footer">
                <a class="button button-secondary" href="#" @click.prevent="fecharFormulario">Cancelar</a>
                <button class="button button-primary" type="submit">
                    {{ formulario.id ? 'Salvar alterações' : 'Salvar cadastro' }}
                </button>
            </div>
        </form>
    </Modal>

    <Modal
        titulo="Confirmar remoção"
        etiqueta="REMOVER REGISTRO"
        :descricao="`Deseja remover o professor ${professorParaRemover.nome}? Esta ação não pode ser desfeita.`"
        :aberto="modalRemoverAberto"
        @fechar="fecharRemocao"
    >
        <div class="modal-footer">
            <a class="button button-secondary" href="#" @click.prevent="fecharRemocao">Cancelar</a>
            <a class="button button-danger" href="#" @click.prevent="confirmarRemocao">Confirmar remoção</a>
        </div>
    </Modal>

    <Notificacao
        v-if="notificacao.exibir"
        :mensagem="notificacao.mensagem"
        :tipo="notificacao.tipo"
        @fechar="fecharNotificacao"
    />

</template>