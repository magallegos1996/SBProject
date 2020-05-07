<template>
    <div class="container pt-3">
        <form enctype="multipart/form-data" @submit.prevent="">
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
                                    <button id="ingresar" class="btn btn-primary btn-block" v-on:click="validarNombre">Ingresar</button>
                                </div>
                            </div>
                            <small class="text-danger text-center"><b>{{error}}</b></small>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Credenciales",
        data () {
            return {
                nombreIngresado: '',
                nombresValidos: ['Stefanía Burneo', 'Stefania Burneo', 'Marcelo Gallegos'],
                error: '',
            }
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
                 this.$emit('validar-usuario', this.nombreIngresado);
            },
        }
    }
</script>

<style scoped>
    img {
        width: 300px;
        height: 300px;
    }
    #ingresar {
        background-color: #2C79A5;
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