<template>
    <div class=" pt-0 pb-0">
        <div class="row pt-1 pb-5">
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
                        <h6 class="card-title text-center" v-else>Sube una nueva foto</h6>
                        <form>
                            <div class="row">
                                <div class="col pb-3">
                                    <input v-model="nombreIngresado" type="text" class="form-control" placeholder="Nombre">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col pb-3">
                                    <textarea v-model="descripcionIngresada" class="form-control" rows="4" placeholder="Descripción (Opcional)"></textarea>
                                </div>
                            </div>
                        </form>
                        <button class="btn btn-block" v-on:click="validarNombre">¡SUBIR FOTO!</button>
                        <small class="text-danger text-center"><b>{{error}}</b></small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Imagen from '../models/Imagen';
    import dateFormat from 'dateformat'

    export default {
        name: "Inicio",
        data() {
            return {
                nombreIngresado: '',
                descripcionIngresada: '',
                hover: false,
                image: '',
                imagenSeleccionada: null,
                formatosValidos : ['image/jpg', 'image/jpeg'],
                error: '',
                imagenValida: false,
                baseURI: 'http://localhost:3000/sb',
                objImagen: new Imagen()
            }
        },
        methods: {
            validarNombre() {
                if(this.nombreIngresado.trim() !== 'Stefania Burneo'){
                    this.error = 'No es un nombre válido';
                }else{
                    if(this.image === '' || !this.imagenValida) {
                        this.error = 'Por favor, seleccione una imagen';
                    }else{
                        this.empezar();
                    }
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
                    this.imagenValida = true;
                    this.error = '';


                }
            },
            validarArchivo(file) {
                //Validar si es imagen jpg o jpeg
                return this.formatosValidos.includes(file.type);
            },
            empezar(){
                //Construccion objeto
                this.objImagen.imagen = this.image;
                this.objImagen.descripcion = this.descripcionIngresada.trim();
                this.objImagen.fechaSubida = this.obtenerFecha();
                this.objImagen.subidoPor = this.nombreIngresado;

                console.log('ESTO ES EL OBJIMG');
                console.log(this.objImagen);

                //Insercion de nueva imagen
                this.$http.post(this.baseURI + '/feed', this.objImagen)
                    .then(() => {
                        console.log('IMAGEN INSERTADA CON ÉXITO');
                        this.$router.push('feed');
                    })
                    .catch(e => console.log('Error al insertar imagen' + e));
            },
            obtenerFecha(){
                return dateFormat(new Date(), 'mediumDate')
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
        font-size: 22px;
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
    textarea{
        resize: none;
    }

</style>