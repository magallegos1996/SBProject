<template>
    <div class="container pt-3">
        <div class="row">
            <div class="col-lg-12">
                <img class="img-fluid mx-auto d-block" src="../assets/login.svg" alt="Login Ill">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center text-muted">Ingresa tus credenciales</h5>
                        <div class="row">
                            <div class="col">
                                <label class="text-muted" for="nombreIngreso">Tu nombre</label>
                                <input v-model="nombreIngresado" type="text" class="form-control" id="nombreIngreso">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-primary btn-block" v-on:click="validarNombre">Ingresar</button>
                                <small class="text-danger text-center"><b>{{error}}</b></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import PublicacionesService from '../service/Publicaciones.service'

    export default {
        name: "Login",
        data () {
            return {
                nombreIngresado: '',
                nombresValidos: ['Stefanía Burneo', 'Stefania Burneo', 'Marcelo Gallegos'],
                publicaciones: [],
                error: '',
            }
        },
        components: {
        },
        methods: {
            validarNombre() {
                if(!this.nombresValidos.includes(this.nombreIngresado.trim())){
                    this.error = 'No es un nombre válido';
                }else{
                    this.autenticar();
                }
            },
            autenticar(){
                localStorage.setItem('LoggedUser', this.nombreIngresado);
                this.cargarPublicaciones();
            },
            async cargarPublicaciones () {
                try{
                    const respuesta = await PublicacionesService.obtenerPublicaciones();
                    this.publicaciones = respuesta.data;
                    this.$store.commit("cargarPublicaciones", this.publicaciones[0]);
                    this.$router.push('feed'); //Se redirecciona a la pagina FEED
                }catch (e) {
                    console.log(e)
                }
            }
        }
    }
</script>

<style scoped>
    img {
        width: 300px;
        height: 300px;
    }
    .btn {
        background-color: #00BFA6;
        color: white;
        font-weight: bold;
        opacity: 0.7;
        transition: 0.3s;
        border: none;
    }
    .btn:hover {
        opacity: 1;
    }
</style>