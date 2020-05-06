<template>
    <div class="text-center ma-2">
        <v-snackbar v-model="uploaded" color="info" top>
            {{ mensaje }}
            <v-btn :color="'#EDE6E3'" text @click="irAHome">Ir al Home</v-btn>
        </v-snackbar>
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
                uploaded: false,
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
            showNotificacionUploaded(){
                this.uploaded = true;
            },
            showNotificacionError(){
                this.error = true;
            },
            irAHome(){
                this.$router.push('home');
            }
        }
    }
</script>

<style scoped>

</style>