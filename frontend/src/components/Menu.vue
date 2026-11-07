<script setup>
defineProps({
    paginaAtual: {
        type: String,
        required: true
    }

})
const emit = defineEmits(["navegar"]);

function selecionarPagina(pagina) {
    emit("navegar", pagina);
}
</script>

<template>
    <nav class="menu" aria-label="Navegação principal">
        <a class="menu-item" @click="selecionarPagina('professores')"
            :class="paginaAtual == 'professores' ? 'active' : ''"><span class="menu-icon">P</span>Professores</a>
        <a class="menu-item" @click="selecionarPagina('cursos')" :class="paginaAtual == 'cursos' ? 'active' : ''"><span
                class="menu-icon">C</span>Cursos</a>
        <a class="menu-item" @click="selecionarPagina('disciplinas')"
            :class="paginaAtual == 'disciplinas' ? 'active' : ''"><span class="menu-icon">D</span>Disciplinas</a>
    </nav>
</template>