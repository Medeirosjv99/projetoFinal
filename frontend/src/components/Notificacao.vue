<script setup>
    defineProps({
        mensagem: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: false,
            default: 'alerta',
            validator: (valor) => ["sucesso", "erro", "alerta"].includes(valor)
        }
    })

    const emit = defineEmits(["fechar", "asdasdas", "dasdasdasd"])
</script>

<template>
    <div class="notificacao" :class="tipo">
        {{ mensagem }}
    <button @click="emit('fechar')">fechar</button>

    </div>
</template>


<style scoped>
.notificacao {    
    width: 300px;
    position: fixed;
    bottom: 30px;
    right: 30px;
}

.sucesso {
    border: solid 1px green;
    color: darkgreen;
    background-color: lightgreen;
}

.erro {
    border: solid 1px red;
    color: darkred;
    background-color: lightcoral;
}

.alerta {
    border: solid 1px goldenrod;
    color: goldenrod;
    background-color: gold;
}

</style>