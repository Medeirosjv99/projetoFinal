<script setup>
import { ref } from "vue";
const curso = "Tecnologias em Sistemas para Internet";
const disciplina = "Programação para internet I"

let contador = ref(0);
const exibirMensagem = ref(false);


function clickBotao(){  
  contador.value++;
  exibirMensagem.value = true;
}

function fecharMensagem(){
  exibirMensagem.value = false;
}

</script>

<template>
  <div>
  <h1>Curso: {{ curso }}</h1>
  <p>Disciplina: {{ disciplina }}</p>  
  <button @click="clickBotao">Clicou {{ contador }} vezes </button>
  </div>

  <div v-if="exibirMensagem">
    Você clicou no botão {{ contador }} vezes.
    <button @click="exibirMensagem = false">Fechar</button>
  </div>

</template>
