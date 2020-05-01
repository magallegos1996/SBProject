<template>
    <div v-if="publicaciones.length === 0">
        <EmptyFeed/>
    </div>
    <div class="container mb-4 mt-4" v-else>
        <div class="row pt-4">
            <div class="col-lg-4 pt-3 pb-3" v-for="(publicacion,index) in publicaciones" v-bind:key="index">
                <div class="card" style="width: 15rem;">
                    <img class="card-img-top img-thumbnail mx-auto" :src="`${publicacion.imagen}`" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-title"><b>{{publicacion.titulo}}</b></p>
                        <p class="card-text" id="descripcionImagen">{{publicacion.descripcion}}</p>
                        <p class="card-text"><small class="text-muted">{{publicacion.fechaSubida}}</small></p>
                        <p class="card-text"><small class="text-muted"><b>Subido por:</b> {{publicacion.subidoPor}}</small></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-12 pr-3">
            <v-btn fab dark fixed bottom right v-bind:color="'#F50057'" @click="irASubirImagen"><font-awesome-icon icon="plus"/></v-btn>
        </div>
    </div>
</template>

<script>

    import EmptyFeed from "./EmptyState";

    export default {
        name: "Feed",
        data () {
            return {
                publicaciones: [],
                baseURI: 'http://localhost:3000/sb',
            }
        },
        components: {
            EmptyFeed,
        },
        created () {
            console.log('CREATED');
            this.publicaciones = this.$store.getters.publicaciones;
            console.log(this.publicaciones);
        },
        methods: {
            irASubirImagen () {
                this.$router.push('subir-foto');
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