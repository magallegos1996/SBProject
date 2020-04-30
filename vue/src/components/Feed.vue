
<template>
    <div>
        <NavBar></NavBar>
        <div class="container">
            <div class="row pt-4">
                <div class="col-md-3 pt-3 pb-3" v-for="(publicacion,index) in publicaciones" v-bind:key="index">
                    <div class="card" style="width: 18rem;">
                        <div class="container">
                            <img class="card-img-top img-fluid text-center pt-3" :src="`${publicacion.imagen}`" alt="Card image cap">
                        </div>
                        <div class="card-body">
                            <p class="card-text">{{publicacion.descripcion}}</p>
                        </div>
                        <small class="card-footer text-muted text-center">{{publicacion.fechaSubida}}</small>
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
    .card-text{
        font-family: Verdana;
        font-size: small;
    }

</style>