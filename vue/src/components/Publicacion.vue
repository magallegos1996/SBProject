<template>
    <v-card class="mx-auto">
        <div @click.stop="mostrarImagen">
            <v-img :src="imagen" max-height="200px"></v-img>
            <v-card-title class="d-inline-block text-truncate" style="max-width: 100%">
                {{titulo}}
            </v-card-title>
            <v-card-subtitle class="pb-0"><b>Subido por: </b>{{subidoPor}}</v-card-subtitle>
            <v-card-subtitle id="fechaHora" class="text-muted">{{fechaSubida}} {{horaSubida}}</v-card-subtitle>
        </div>
        <v-card-actions>
            <v-btn :color="'#006BA6'" text @click="abrirPublicacion">Abrir publicación</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-card-text class="text-muted" v-if="descripcion === ''">
                    No hay una descripción
                </v-card-text>
                <v-card-text v-else>
                    {{descripcion}}
                </v-card-text>
            </div>
        </v-expand-transition>
        <Modal ref="modal"
               :idPublicacion="idPublicacion"
               :imagen="imagen"
               :tipo-modal="tipoModal"
               :mensaje-modal="mensajeModal"
        />
    </v-card>
</template>

<script>
    import Modal from "./Modal";

    export default {
        name: "Publicacion",
        data() {
            return {
                show: false,
                dialog: false,
                publicPath: process.env.BASE_URL,
                tipoModal: '',
                mensajeModal: '',
            }
        },
        props: {
            idPublicacion: String,
            imagen: String,
            titulo: String,
            descripcion: String,
            fechaSubida: String,
            horaSubida: String,
            subidoPor: String
        },
        components: {
            Modal
        },
        methods: {
            mostrarImagen(){
                this.tipoModal = 'mostrarImagen';
                this.mensajeModal = '';
                this.$refs.modal.showModalMostrarImagen(); //Con refs se esta ejecutando el metodo showModal del componente Modal
            },
            abrirPublicacion(){
                this.$router.push('publicacion/' + this.idPublicacion);
            },
        }
    }
</script>

<style scoped>
    #fechaHora {
        font-size: 12px;
    }
</style>