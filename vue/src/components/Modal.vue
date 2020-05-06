<template>
    <!--gracias a v-model se abre el dialogo porque cambia el valor de dialog según se ejecute el metodo showModal-->
    <v-row v-if="tipoModal === 'mostrarImagen' && mensajeModal === ''" justify="center">
        <v-dialog v-model="dialog" width="400">
            <v-card class="mx-auto" max-height="600">
                <v-img :src="imagen" contain></v-img>
            </v-card>
        </v-dialog>
    </v-row>
    <v-row v-else-if="tipoModal === 'comentarImagen'" justify="center">
        <v-dialog v-model="dialog" width="400">
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="500px">
                    <v-card  max-height="500px">
                        <v-card-title>
                            <span class="headline">{{mensajeModal}}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-textarea
                                                label="Comentar"
                                                auto-grow
                                                outlined
                                                rows="3"
                                                row-height="30"
                                                shaped
                                        ></v-textarea>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">Guardar</v-btn>
                            <v-btn :color="'#b20d30'" text @click="dialog = false">Cancelar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-row>
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
            showModalComentarPublicacion(){
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