<template>
    <div class="container">
        <div class="row pr-5">
            <div class="col-12">
                <v-btn fab dark fixed top left slot="activator" v-bind:color="'#E39695'" @click="irAHome"><font-awesome-icon icon="arrow-left"/></v-btn>
            </div>
        </div>
        <div class="row">
            <div class="col-9">
                <v-card max-height="550px">
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-img max-height="500px" max-width="500px" :src="imagen"></v-img>
                            </v-col>
                            <v-col cols="6" class="pl-2">
                                <v-row class="flex-column ma-0 text-center">
                                    <v-card-title class="justify-center">{{publicacion.titulo}}</v-card-title>
                                    <v-card-subtitle class="pb-1">
                                        <b>Subido por: </b> {{publicacion.subidoPor}}
                                    </v-card-subtitle>
                                    <small class="text-muted">{{publicacion.fechaSubida}} {{publicacion.horaSubida}}</small>
                                </v-row>
                                <v-row class="ma-0" v-if="publicacion.descripcion !== ''">
                                    <v-card-text>{{publicacion.descripcion}}</v-card-text>
                                </v-row>
                                <v-row class="ma-0 mt-3" v-else>
                                    <v-card-text id="descripcion" class="text-muted">No hay una descripción disponible</v-card-text>
                                </v-row>
                                <Comentario
                                        :comentarios="publicacion.comentarios"
                                />
                                <v-card-actions class="flex-column-reverse">
                                    <div>
                                        <v-btn text small color="primary" @click="mostrarModalComentar">Comentar</v-btn>
                                        <v-btn text small color="error" @click="mostrarModalEliminacion">Eliminar Publicación</v-btn>
                                    </div>
                                </v-card-actions>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </div>
        </div>
        <Modal ref="modal"
               :idPublicacion="publicacion._id"
               :tipo-modal="tipoModal"
               :mensaje-modal="mensajeModal"
               @guardar-comentario="guardarComentario"
               @eliminar-publicacion="eliminarPublicacion"
        />
        <Notificacion ref="notificacion"
                      :mensaje="mensajeNotificacion"
        />
    </div>
</template>

<script>

    import PublicacionesService from '../service/Publicaciones.service';
    import ComentariosService from '../service/Comentarios.service';
    import Usuario from '../service/Usuario.service'
    import Comentario from "./Comentario";
    import Notificacion from "./Notificacion";
    import Modal from "./Modal";

    export default {
        name: "DetallePublicacion",
        data(){
            return {
                publicacion: {},
                imagen: '',
                publicPath: process.env.BASE_URL,
                tipoModal: '',
                mensajeModal: '',
                mensajeNotificacion: '',
            }
        },
        async created() {
            await this.obtenerPublicacion(this.$route.params.id);
        },
        components: {
            Modal,
            Comentario,
            Notificacion
        },
        methods: {
            irAHome(){
                this.$router.push('/home');
            },
            async obtenerPublicacion (id) {
                try{
                    const resultado = await PublicacionesService.obtenerPublicacionPorId(id);
                    this.publicacion = resultado.data
                    this.imagen = `${this.publicPath}img/uploads/${this.publicacion.nombre}`
                }catch (e) { console.log('Error al obtener publicacion: ' + e);}
            },
            mostrarModalEliminacion(){
                this.tipoModal= 'eliminarImagen';
                this.mensajeModal = '¿Seguro que quieres eliminar esta publicación?';
                this.$refs.modal.showModalEliminarPublicacion();
            },
            mostrarModalComentar(){
                this.tipoModal = 'comentarImagen';
                this.mensajeModal = 'COMENTAR PUBLICACIÓN';
                this.$refs.modal.showModalComentarPublicacion();
            },
            mostrarNotificacion(tipo){
                if(tipo === 'exito'){
                    this.mensajeNotificacion = 'El comentario se ha guardado';
                    this.$refs.notificacion.showNotificacionExito()
                }else{
                    this.mensajeNotificacion = 'Algo salió mal. Inténtalo de nuevo';
                    this.$refs.notificacion.showNotificacionError()
                }
            },
            async obtenerUsuario(){
                const resultado = await Usuario.obtenerUsuario(localStorage.getItem('LogUser'))
                return resultado.data;
            },
            async guardarComentario(comentario){
                const usuario = await this.obtenerUsuario();
                const datos = {
                    idPublicacion: this.publicacion._id,
                    comentario: {
                        nombre: usuario.nombre,
                        comentario: comentario,
                        avatar: `${this.publicPath}img/uploads/${usuario.avatarPath}`
                    }
                };
                try{
                    const resultado = await ComentariosService.insertarComentario(datos);
                    const comentarioInsertado = resultado.data;
                    console.log('COMENTARIO INSERTADO');
                    console.log(comentarioInsertado);
                    this.publicacion.comentarios.push(datos.comentario);
                    this.mostrarNotificacion('exito');
                }catch (e) { console.log('Error al guardar el comentario: ' + e); this.mostrarNotificacion('error'); }
            },
            async eliminarPublicacion(publicacion){
                try{
                    const resultado = await PublicacionesService.eliminarPublicacion(publicacion.idPublicacionAEliminar);
                    const publicacionEliminada = resultado.data;
                    console.log('PUBLICACION ELIMINADA EN PUBLICACION');
                    console.log(publicacionEliminada);
                    await this.$router.push('/home');
                }catch (e) { console.log('Error al eliminar la publicacion: ' + e); this.mostrarNotificacion('error') }
            }
        }
    }
</script>

<style scoped>
    #descripcion{
        font-size: 12px;
    }

</style>