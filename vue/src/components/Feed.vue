<template>
    <div class="container">
        <div class="row pt-4">
            <div class="col-lg-4 pt-3 pb-3" v-for="(publicacion,index) in publicaciones" v-bind:key="index">
                <Publicacion
                        id="publicacion"
                        :idPublicacion="publicacion._id"
                        :titulo="publicacion.titulo"
                        :descripcion="publicacion.descripcion"
                        :fechaSubida="publicacion.fechaSubida"
                        :horaSubida="publicacion.horaSubida"
                        :subidoPor="publicacion.subidoPor"
                        :imagen="`${publicPath}img/uploads/${publicacion.nombre}`"
                />
            </div>
        </div>
        <v-btn fab dark fixed bottom right v-bind:color="'#F50057'" @click="irASubirImagen"><font-awesome-icon icon="plus"/></v-btn>
        <div class="col-lg-12 pt-5 text-center" v-if="hasNextPage">
            <v-btn  rounded light @click="cargarMas">Ver más</v-btn>
        </div>
    </div>
</template>

<script>
    import Publicacion from "./Publicacion";

    export default {
        name: "Feed",
        data () {
            return {
                buscando: false,
                nextPage: 0,
                publicPath: process.env.BASE_URL, //Importante para tener acceso a la carpeta publica de manera que se puedan acceder a las imagenes
            }
        },
        props: {
            resultadoBusqueda: {
                type: Array,
                default: () => [],
            },
            publicaciones: {
                type: Array,
                default: () => [],
                required: true,
            },
            hasNextPage: {
                type: Boolean,
                default: false,
                required: true,
            },
        },
        components: {
            Publicacion,
        },
        methods: {
            irASubirImagen () {
                this.$store.commit("cargarPublicaciones", []);
                this.$router.push('subir-foto');
            },
            cargarMas () {
                this.$emit('cargar-mas');
            },
            /*quitarPublicacionFeed (publicacionEliminada) {
                const index = this.publicaciones.findIndex(publicacion => publicacion._id === publicacionEliminada._id);
                this.publicaciones.splice(index, 1);
                this.$router.push('home');
            }*/
        }
    }
</script>
<style scoped>
    .container img {
        width: 250px;
        height: 250px;
    }
    #publicacion{
        cursor: pointer;
    }
    #publicacion:hover{
        box-shadow: -1px 6px 35px 3px darkgray;
    }
</style>