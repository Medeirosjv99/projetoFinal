<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    titulo: {
        type: String,
        required: true
    },
    etiqueta: {
        type: String,
        default: ""
    },
    descricao: {
        type: String,
        default: ""
    },
    aberto: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["fechar"]);

const dialog = ref(null);

watch(() => props.aberto, function (estaAberto) {
    if (estaAberto) {
        dialog.value.showModal();
    } else {
        dialog.value.close();
    }
});

function fechar() {
    emit("fechar");
}
</script>

<template>
    <dialog ref="dialog" class="modal-dialog" @close="fechar">
        <div class="modal-panel">
            <header class="modal-header">
                <div>
                    <span v-if="etiqueta" class="eyebrow">{{ etiqueta }}</span>
                    <h2>{{ titulo }}</h2>
                    <p v-if="descricao">{{ descricao }}</p>
                </div>
                <a class="icon-button" href="#" aria-label="Fechar modal" @click.prevent="fechar">×</a>
            </header>

            <slot></slot>
        </div>
    </dialog>
</template>

<style scoped>

.modal-dialog {
    width: min(100% - 40px, 520px);
    max-width: none;
    padding: 0;
    border: none;
    background: transparent;
    overflow: visible;
}

.modal-dialog::backdrop {
    background: #1420377a;
    backdrop-filter: blur(3px);
}
</style>
