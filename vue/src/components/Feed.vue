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
            <AddFotoBtn/>
        </div>
    </div>
</template>

<script>

    import EmptyFeed from "./EmptyState";
    import AddFotoBtn from "./AddFotoBtn";

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
            AddFotoBtn
        },
        created() {
            this.$http.get(this.baseURI + '/feed')
                .then((publicaciones)=>{
                    this.publicaciones = publicaciones.data;
                    console.log("PUBLICACIONES");
                    console.log(this.publicaciones);
                })
                .catch(e => console.log(e));
        },
        methods: {
        }
    }
</script>

<style scoped>

    .card-img-top {
        border-radius: 25px;
        object-fit: cover;
        border: none;
    }
    .card{
    }
    .container img {
        width: 250px;
        height: 250px;
    }
    .card:hover{
        cursor: pointer;
        box-shadow: -1px 6px 35px 3px darkgray;
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