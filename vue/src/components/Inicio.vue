<template>
    <div class=" pt-5 pb-5">
        <div class="row pt-5 pb-5">
            <div class="col-lg-4 offset-lg-4">
                <div class="card pt-4">
                    <div class="container">
                        <label for="image">
                            <input type="file" name="image" id="image" style="display:none;" @change="onFileChange"/>
                            <img v-if="image === ''" class="card-img-top img-fluid text-center" @mouseover="hover = true" @mouseleave="hover = false" src="../assets/photo-icon.png" alt="Card image cap">
                            <img v-else class="card-img-top img-fluid text-center" @mouseover="hover = true" @mouseleave="hover = false" :src="image" alt="Card image cap">
                        </label>
                    </div>
                    <div class="card-body">
                        <h6 class="card-title text-center" v-if="!hover">Ingresa tu nombre</h6>
                        <h6 class="card-title text-center" v-else>Sube una foto tuya</h6>
                        <form>
                            <div class="row">
                                <div class="col pb-3">
                                    <input v-model="nombreIngresado" type="text" class="form-control" placeholder="Nombre">
                                </div>
                            </div>
                        </form>
                        <button class="btn btn-block" v-on:click="validarNombre">¡EMPEZAR!</button>
                        <small class="text-danger text-center"><b>{{error}}</b></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Inicio",
        data() {
            return {
                nombreIngresado: '',
                hover: false,
                image: '',
                imagenSeleccionada: null,
                formatosValidos : ['image/jpg', 'image/jpeg'],
                error: ''
            }
        },
        methods: {
            validarNombre() {
                if(this.nombreIngresado.trim() !== 'Stefania Burneo'){
                    this.error = 'No es un nombre válido';
                }
            },
            onFileChange(e) {
                const file = e.target.files[0];
                const fileReader = new FileReader();

                if(!this.validarArchivo(file)){
                    this.error = 'No ha seleccionado una imagen';
                }else{
                    fileReader.addEventListener('load', () => {
                        this.image = fileReader.result;
                    });
                    fileReader.readAsDataURL(file);
                    this.imagenSeleccionada = file;
                }
            },
            validarArchivo(file) {
                //Validar si es imagen jpg o jpeg
                return this.formatosValidos.includes(file.type);

            }
        }
    }
</script>

<style scoped>

    .card {
        background-color: #1abc9c;
        width: 18rem;
        border: none;
    }
    .row {
        background-color: #1abc9c;
    }
    .card-img-top {
        border-radius: 25px;
        object-fit: cover;
    }
    .card-title{
        color: white;
        font-size: x-large;
        font-family: "Arial Black";
    }
    .btn {
        background-color: #EE6352;
        color: white;
        font-weight: bold;
    }
    .btn:hover {
        box-shadow: 5px 10px 13px #0A5B3E;
    }
    .card-img-top:hover{
        cursor: pointer;
        box-shadow: -1px 6px 35px 3px #0D6C4E;
    }
    .container img {
        width: 288px;
        height: 288px;
    }

</style>