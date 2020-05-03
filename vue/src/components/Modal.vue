<template>
    <!--gracias a v-model se abre el dialogo porque cambia el valor de dialog según se ejecute el metodo showModal-->
    <v-row v-if="tipoModal === 'mostrarImagen' && mensajeModal === ''" justify="center">
        <v-dialog v-model="dialog" width="400">
            <v-card class="mx-auto" max-height="600">
                <v-img :src="imagen" contain></v-img>
            </v-card>
        </v-dialog>
    </v-row>
    <v-row v-else justify="center">
        <v-dialog v-model="dialog" width="400">
            <v-card class="mx-auto" max-height="600">
                <v-card-title class="headline">Eliminar publicación</v-card-title>
                <v-card-text>{{mensajeModal}}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :color="'#353535'" text @click="dialog = false">Cancelar</v-btn>
                    <v-btn :color="'#b20d30'" text @click="eliminarPublicacion">Eliminar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>

</template>

<script>

    export default {
        name: 'Modal',
        data () {
            return {
                dialog: false,
            }
        },
        props:{
            idPublicacion: String,
            imagen: String,
            titulo: String,
            subidoPor: String,
            tipoModal: String,
            mensajeModal: String
        },
        methods: {
            showModalMostrarImagen() {
                this.dialog = true;
            },
            showModalEliminarPublicacion(){
                this.dialog = true;
            },
            eliminarPublicacion(){
                this.dialog = false;
                const datosParaEliminacion = {
                    idPublicacionAEliminar: this.idPublicacion,
                    pathPublicacionAEliminar: this.imagen
                }
                this.$emit('eliminar-publicacion', datosParaEliminacion);
            }
        }
    }
</script>

<style scoped>
</style>