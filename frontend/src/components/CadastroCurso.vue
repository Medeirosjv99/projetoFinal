<script setup>
import { ref } from "vue";
import Notificacao from "./Notificacao.vue";

const curso = ref({
    nome: "Nome padrão",
    cargaHoraria: null
})

const exibir = ref(false)
const mensagemNotificacao = ref("")


function fecharNotificacao() {
    exibir.value = false;
}

function cadastrar() {
    exibir.value = true;
    mensagemNotificacao.value = "Curso cadastrado com sucesso"

}

</script>

<template>
    <form @submit.prevent="cadastrar">
        <div>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" v-model="curso.nome">
        </div>
        <div>
            <label for="cargaHoraria">Carga Horária:</label>
            <input type="number" id="cargaHoraria" v-model="curso.cargaHoraria">
        </div>
        <input type="submit" value="Cadastrar">
    </form>

    <Notificacao v-if="exibir" :mensagem="mensagemNotificacao" @fechar="fecharNotificacao" />


</template>
