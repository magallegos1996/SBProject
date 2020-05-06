<template>
    <div>
        <Modal ref="modal"
               :tipo-modal="tipoModal"
               :mensaje-modal="mensajeModal"
               :avatar="avatar"
               :nombre="nombre"
        />
        <div class="ma-4">
            <v-card outlined v-if="this.comentarios.length!==0" style="height: 250px">
                <v-list dense three-line style="max-height: 250px" class="overflow-y-auto">
                    <v-list-item-group v-for="(comentario, index) in comentarios" v-bind:key="index">
                        <v-list-item inactive flat>
                            <v-list-item-avatar>
                                <v-img :src="comentario.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="comentario.nombre"></v-list-item-title>
                                <v-list-item-subtitle v-text="comentario.comentario" ></v-list-item-subtitle>
                                <v-list-item-subtitle id="verMas" @click="mostrarComentario(index)" v-text="'VER MÁS'" style="font-size: 9px; cursor: pointer"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
            <v-card outlined v-else style="height: 250px">
                <div class="ma-4 mt-4">
                    <small class="text-muted">No hay comentarios</small>
                </div>
            </v-card>
        </div>
    </div>
</template>
<script>

    import Modal from "./Modal";

    export default {
        name: "Comentario",
        data(){
            return{
                show: false,
                tipoModal: '',
                mensajeModal: '',
                avatar: '',
                nombre: '',
            }
        },
        components:{
            Modal
        },
        props: {
            comentarios:{
                type: Array,
                required: true,
                default: () => [],
            }
        },
        methods:{
            mostrarComentario(index){
                this.tipoModal = 'mostrarComentario';
                this.mensajeModal = this.comentarios[index].comentario;
                this.avatar = this.comentarios[index].avatar;
                this.nombre = this.comentarios[index].nombre;
                this.$refs.modal.showModalMostrarComentario(); //Con refs se esta ejecutando el metodo showModal del componente Modal
            }
        }
    }
</script>

<style scoped>
    #verMas:hover{
        color: #3581B8;
    }
</style>