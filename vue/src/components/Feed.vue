<template>
    <div v-if="publicaciones.length === 0">
        <EmptyFeed/>
    </div>
    <div class="container mb-4 mt-4" v-else>
        <v-btn fab dark fixed top right v-bind:color="'#F50057'" @click="irASubirImagen"><font-awesome-icon icon="plus"/></v-btn>
        <div class="row pt-4">
            <div class="col-lg-4 pt-3 pb-3" v-for="(publicacion,index) in publicaciones" v-bind:key="index">
                <div class="card" style="width: 15rem;">
                    <img class="card-img-top img-thumbnail mx-auto" :src="`${publicPath}img/uploads/${publicacion.nombre}`" alt="Imagen">
                    <div class="card-body">
                        <p class="card-title"><b>{{publicacion.titulo}}</b></p>
                        <p class="card-text"><small class="text-muted">{{publicacion.fechaSubida}} {{publicacion.horaSubida}}</small></p>
                        <p class="card-text"><small class="text-muted"><b>Subido por:</b> {{publicacion.subidoPor}}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12 pt-5 text-center">
            <v-btn v-if="hasNextPage" rounded light @click="cargarMas">Ver más</v-btn>
        </div>
    </div>
</template>

<script>

    import EmptyFeed from "./EmptyState";
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
        },
        async created () {
            const respuesta = await PublicacionesService.obtenerPublicaciones();
            this.publicaciones = respuesta.data.docs; //usando mongoose pagination
            this.hasNextPage = respuesta.data.hasNextPage
            this.nextPage = respuesta.data.nextPage
            console.log(this.hasNextPage);
            console.log(this.nextPage);
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
                    console.log(respuesta.data.docs);
                    this.publicaciones.push.apply(this.publicaciones, respuesta.data.docs);
                    this.hasNextPage = respuesta.data.hasNextPage
                    this.nextPage = respuesta.data.nextPage
                    console.log(this.publicaciones.length);
                }
            }
        }
    }
</script>

<style scoped>

    .card-img-top {
        border-radius: 25px;
        object-fit: cover;
        border: none;
    }
    .card {
        opacity: 0.85;
        transition: 0.3s;
    }
    .container img {
        width: 250px;
        height: 250px;
    }
    .card:hover{
        cursor: pointer;
        box-shadow: -1px 6px 35px 3px darkgray;
        opacity: 1;
    }
    .card-title{
        font-size: 15px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    #descripcionImagen{
        font-size: 11px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* number of lines to show */
        -webkit-box-orient: vertical;
    }
</style>