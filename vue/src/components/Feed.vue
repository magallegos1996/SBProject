<template>
    <div>
        <NavBar></NavBar>
        <div class="container">
            <div class="row pt-4">
                <div class="col-lg-4 pt-3 pb-3" v-for="(publicacion,index) in publicaciones" v-bind:key="index">
                    <div class="card" style="width: 18rem;">
                        <div class="container">
                            <img class="card-img-top img-fluid pt-3" :src="`${publicacion.imagen}`" alt="Card image cap">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">{{publicacion.titulo}}</h5>
                            <p class="card-text" id="descripcionImagen">{{publicacion.descripcion}}</p>
                            <p class="card-text"><small class="text-muted">{{publicacion.fechaSubida}}</small></p>
                            <p class="card-text"><small class="text-muted">-{{publicacion.subidoPor}}-</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import NavBar from "./NavBar";

    export default {
        name: "Feed",
        data () {
            return {
                publicaciones: [],
                baseURI: 'http://localhost:3000/sb',
            }
        },
        components: {
            NavBar
        },
        mounted() {
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
    }
    .container img {
        width: 288px;
        height: 288px;
    }
    .card:hover{
        cursor: pointer;
        box-shadow: -1px 6px 35px 3px darkgray;
        border: 1px solid #1abc9c;
    }
    #descripcionImagen{
        font-size: 14px;
    }
</style>