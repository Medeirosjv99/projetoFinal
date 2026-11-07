<script setup>
import { ref } from "vue";
import Menu from './components/Menu.vue';
import Curso from './pages/Curso.vue';
import Disciplina from './pages/Disciplina.vue';
import Professores from "./pages/professores.vue";

const paginaAtual = ref("cursos");

function navegar(pagina) {
  paginaAtual.value = pagina;
}
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <a class="brand" href="professores.html">
        <div class="brand-mark">GA</div>
        <div><strong>Gestão Acadêmica</strong><span>Painel administrativo</span></div>
      </a>
      <p class="menu-label">CADASTROS</p>
      <Menu :pagina-atual="paginaAtual" @navegar="navegar" />
      <div class="sidebar-footer">
        <div class="avatar">AD</div>
        <div><strong>Administrador</strong><span>Gestão do sistema</span></div>
      </div>
    </aside>

    <main class="main">
      <Disciplina v-if="paginaAtual == 'disciplinas'" />
      <Curso v-if="paginaAtual == 'cursos'" />
      <Professores v-if="paginaAtual == 'professores'" />
    </main>
  </div>
</template>