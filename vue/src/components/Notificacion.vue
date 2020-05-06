<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="exito" color="success" top right>{{ mensaje }}</v-snackbar>
        <v-snackbar v-model="error" color="error" top right>{{ mensaje }}</v-snackbar>
    </div>
</template>

<script>
    export default {
        name: "Notificacion",
        data (){
            return{
                exito: false,
                error: false,
            }
        },
        props:{
            mensaje: {
                type: String,
                default: ''
            }
        },
        methods:{
            showNotificacionExito(){
                this.exito = true;
            },
            showNotificacionError(){
                this.error = true;
            }
        }
    }
</script>

<style scoped>

</style>