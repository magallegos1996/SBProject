<template>
    <v-card class="mx-auto">
        <v-img :src="imagen" max-height="200px"></v-img>
        <v-card-title>{{titulo}}</v-card-title>
        <v-card-subtitle class="pb-0"><b>Subido por: </b>{{subidoPor}}</v-card-subtitle>
        <v-card-subtitle id="fechaHora" class="text-muted align-end">{{fechaSubida}} {{horaSubida}}</v-card-subtitle>
        <v-card-actions>
            <v-btn :color="'#2B9EB3'" primary text @click.stop="mostrarImagen">Ver</v-btn>
            <v-btn :color="'#7776BC'" text @click="mostrarModalEliminacion">Comentar</v-btn>
            <v-btn :color="'#b20d30'" text @click="mostrarModalEliminacion">Eliminar</v-btn>
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
               :titulo="titulo"
               :subidoPor="subidoPor"
               :tipo-modal="tipoModal"
               :mensaje-modal="mensajeModal"
               @eliminar-publicacion="eliminarPublicacion"
        />
    </v-card>
</template>

<script>
    import Modal from "./Modal";
    import PublicacionService from '../service/Publicaciones.service'

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
            mostrarModalEliminacion(){
                this.tipoModal= 'eliminarImagen';
                this.mensajeModal = '¿Seguro que quieres eliminar esta publicación?';
                this.$refs.modal.showModalEliminarPublicacion();
            },
            async eliminarPublicacion(publcacion){
                try{
                    const resultado = await PublicacionService.eliminarPublicacion(publcacion.idPublicacionAEliminar);
                    //Emitir publicacion eliminada a FEED COMPONENT
                    const publicacionEliminada = resultado.data;
                    console.log('PUBLCACION ELIMINADA EN PUBLICACION');
                    console.log(publicacionEliminada);
                    this.$emit('quitar-publicacion-feed', publicacionEliminada);
                }catch (e) { console.log('Error al eliminar la publicacion: ' + e) }
            }
        }
    }
</script>

<style scoped>
    #fechaHora {
        font-size: 12px;
    }
</style>