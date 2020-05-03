<template>
    <div v-if="publicaciones.length === 0">
        <EmptyFeed/>
    </div>
    <div class="container" v-else>
        <v-btn fab dark fixed top right v-bind:color="'#F50057'" @click="irASubirImagen"><font-awesome-icon icon="plus"/></v-btn>
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
                            @quitar-publicacion-feed="quitarPublicacionFeed"
                    />
            </div>
        </div>
        <div class="col-lg-12 pt-5 text-center" v-if="hasNextPage">
            <v-btn  rounded light @click="cargarMas">Ver más</v-btn>
        </div>
    </div>
</template>

<script>

    import EmptyFeed from "./EmptyState";
    import Publicacion from "./Publicacion";
    import PublicacionesService from '../service/Publicaciones.service'

    export default {
        name: "Feed",
        data () {
            return {
                publicaciones: [],
                nextPage: 0,
                hasNextPage: false,
                publicPath: process.env.BASE_URL, //Importante para tener acceso a la carpeta publica de manera que se puedan acceder a las imagenes
            }
        },
        components: {
            EmptyFeed,
            Publicacion,
        },
        async created () {
            const respuesta = await PublicacionesService.obtenerPublicaciones();
            //console.log(respuesta.data.docs);
            this.publicaciones = respuesta.data.docs; //usando mongoose pagination
            this.hasNextPage = respuesta.data.hasNextPage
            this.nextPage = respuesta.data.nextPage
        },
        mounted() {},
        methods: {
            irASubirImagen () {
                this.$store.commit("cargarPublicaciones", []);
                this.$router.push('subir-foto');
            },
            async cargarMas () {
                if(this.hasNextPage) {
                    const respuesta = await PublicacionesService.obtenerSiguientesPublicaciones(this.nextPage);
                    this.publicaciones.push.apply(this.publicaciones, respuesta.data.docs);
                    this.hasNextPage = respuesta.data.hasNextPage
                    this.nextPage = respuesta.data.nextPage
                }
            },
            quitarPublicacionFeed (publicacionEliminada) {
                const index = this.publicaciones.findIndex(publicacion => publicacion._id === publicacionEliminada._id);
                this.publicaciones.splice(index, 1);
            }
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