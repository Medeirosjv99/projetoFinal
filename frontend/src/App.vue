<script setup>
import { ref } from "vue";
import Menu from './components/Menu.vue';
import Curso from './pages/Curso.vue';
import Disciplina from './pages/Disciplina.vue';
import Professores from './pages/Professores.vue';

const paginaAtual = ref("cursos");
const titulos = {
    professores: "Professores",
    cursos: "Cursos",
    disciplinas: "Disciplinas"
};

function navegar(pagina) {
    paginaAtual.value = pagina;
}
</script>

<template>
    <div class="app">
        <aside class="sidebar">

            <a class="brand" href="#" @click.prevent="navegar('cursos')">
                <div class="brand-mark">GA</div>
                <div>
                    <strong>Gestão Acadêmica</strong>
                    <span>Painel administrativo</span>
                </div>
            </a>

            <p class="menu-label">CADASTROS</p>

            <Menu
                :pagina-atual="paginaAtual"
                @navegar="navegar"
            />

            <div class="sidebar-footer">
                <div class="avatar">AD</div>
                <div>
                    <strong>Administrador</strong>
                    <span>Gestão do sistema</span>
                </div>
            </div>

        </aside>

        <main class="main">

            <header class="topbar">
                <div>
                    <span class="eyebrow">CADASTROS</span>
                    <h1>{{ titulos[paginaAtual] }}</h1>
                </div>
                <div class="topbar-tag"><span class="status-dot"></span>Painel administrativo</div>
            </header>

            <Curso v-if="paginaAtual === 'cursos'" />

            <Disciplina v-else-if="paginaAtual === 'disciplinas'" />

            <Professores v-else-if="paginaAtual === 'professores'" />

        </main>
    </div>
</template>
