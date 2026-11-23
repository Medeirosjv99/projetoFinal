<script setup>
const texto = defineModel({ type: String, default: "" });

defineProps({
    placeholder: {
        type: String,
        default: "Buscar por nome"
    }
});
</script>

<template>
    <label class="search-box">
        ⌕
        <input type="search" v-model="texto" :placeholder="placeholder">
    </label>
</template>

<style scoped>
.search-box input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    color: var(--ink);
    font-size: 11px;
}
</style>
