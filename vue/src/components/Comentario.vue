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
                comentarios: [
                    {
                        nombre: 'Marcelo Gallegos',
                        comentario: 'El 16 de marzo pasado, el Ejecutivo decretó el estado de excepción para enfrentar la propagación del coronavirus en el país. De acuerdo con el constitucionalista Jorge Benavides, el Gobierno podía decretarlo por 60 días y recurrir a una prórroga de 30 días más; es decir 90 días en total.',
                        avatar: `${process.env.BASE_URL}icons/no-avatar-png-5.png`
                    },
                    {
                        nombre: 'Stefania Burneo',
                        comentario: 'Benavides indicó que esta decisión tendrá que ser puesta en conocimiento de la Corte Constitucional. La entidad, el pasado 20 de marzo ya dictaminó la constitucionalidad del decreto.',
                        avatar: `${process.env.BASE_URL}icons/no-avatar-png-5.png`
                    },
                    {
                        nombre: 'Marcelo Gallegos',
                        comentario: 'El presidente Moreno anunció revisiones presupuestarias de entre el 10% y el 15% como parte de esa reingeniería. “Hasta el 30 de mayo todos deberemos adoptar las medidas que correspondan, de conformidad con la Constitución y las leyes, con el acompañamiento del Ministerio de Finanzas”, indicó',
                        avatar: `${process.env.BASE_URL}icons/no-avatar-png-5.png`
                    },
                    {
                        nombre: 'Marcelo Gallegos',
                        comentario: 'El presidente Moreno anunció revisiones presupuestarias de entre el 10% y el 15% como parte de esa reingeniería. “Hasta el 30 de mayo todos deberemos adoptar las medidas que correspondan, de conformidad con la Constitución y las leyes, con el acompañamiento del Ministerio de Finanzas”, indicó',
                        avatar: `${process.env.BASE_URL}icons/no-avatar-png-5.png`
                    },
                    {
                        nombre: 'Stefania Burneo',
                        comentario: 'El próximo 15 de mayo terminará el plazo con el que el Gobierno cuenta para actuar bajo las condiciones que le permite la Constitución en medio de un estado de excepción.',
                        avatar: `${process.env.BASE_URL}icons/no-avatar-png-5.png`
                    },
                    {
                        nombre: 'Stefania Burneo',
                        comentario: 'El próximo 15 de mayo terminará el plazo con el que el Gobierno cuenta para actuar bajo las condiciones que le permite la Constitución en medio de un estado de excepción.',
                        avatar: `${process.env.BASE_URL}icons/no-avatar-png-5.png`
                    }
                ],
            }
        },
        components:{
            Modal
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