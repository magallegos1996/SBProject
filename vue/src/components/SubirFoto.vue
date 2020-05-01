<template>
    <div class="container">
        <div class="col-lg-12 pr-5">
            <v-btn fab dark fixed top left slot="activator" v-bind:color="'#00BFA6'" v-on="on" @click="irAFeed"><font-awesome-icon icon="arrow-left"/></v-btn>
        </div>
        <div class="col-lg-4 offset-lg-4">
            <div class="card mt-3">
                <div class="container text-center">
                    <label for="image">
                        <input type="file" name="image" id="image" style="display:none;" @change="onFileChange"/>
                        <img v-if="image === ''" class="card-img-top img-fluid text-center" @mouseover="hover = true" @mouseleave="hover = false" src="../assets/photo-icon.png" alt="Card image cap">
                        <img v-else class="card-img-top img-fluid text-center" @mouseover="hover = true" @mouseleave="hover = false" :src="image" alt="Card image cap">
                    </label>
                </div>
                <div class="card-body">
                    <h6 class="card-title text-center text-muted">Sube una nueva foto</h6>
                    <form>
                        <div class="row">
                            <div class="col pb-2">
                                <input v-model="tituloIngresado" id="tituloImagen" type="text" class="form-control text-center" placeholder="Título de la foto">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col pb-2">
                                <textarea v-model="descripcionIngresada" class="form-control" rows="4" placeholder="Descripción (Opcional)"></textarea>
                            </div>
                        </div>
                    </form>
                    <button class="btn btn-block" v-on:click="subirFoto">¡SUBIR FOTO!</button>
                    <small class="text-danger text-center"><b>{{error}}</b></small>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Imagen from '../models/Imagen';
    import dateFormat from 'dateformat'
    import { AuthService } from "../service/auth.service";

    export default {
        name: "SubirFoto",
        data() {
            return {
                tituloIngresado: '',
                descripcionIngresada: '',
                hover: false,
                image: '',
                formatosValidos : ['image/jpg', 'image/jpeg'],
                error: '',
                imagenValida: false,
                baseURI: 'http://localhost:3000/sb',
                objImagen: new Imagen(),
                estaAutenticado: false,
            }
        },
        components: {
        },
        mounted() {
            if(AuthService.isAuth()){
                this.estaAutenticado = true;
            }
        },
        methods: {
            subirFoto() {
                if(this.image === '' || !this.imagenValida) {
                    this.error = 'Por favor, seleccione una imagen';
                }else{
                    if(this.tituloIngresado.trim() === ''){
                        this.error = 'El título es obligatorio';
                    }else{
                        this.subir();
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
                    this.imagenValida = true;
                    this.error = '';
                }
            },
            validarArchivo(file) {
                //Validar si es imagen jpg o jpeg
                return this.formatosValidos.includes(file.type);
            },
            subir(){
                //Construccion objeto
                this.objImagen.titulo = this.tituloIngresado.trim();
                this.objImagen.imagen = this.image;
                this.objImagen.descripcion = this.descripcionIngresada.trim();
                this.objImagen.fechaSubida = this.obtenerFecha();
                this.objImagen.subidoPor = localStorage.getItem('LoggedUser');

                //Insercion de nueva imagen
                this.$http.post(this.baseURI + '/feed', this.objImagen)
                    .then(() => {
                        console.log('IMAGEN INSERTADA CON ÉXITO');
                        this.$http.get(this.baseURI + '/feed')
                            .then((publicaciones)=>{
                                this.publicaciones = publicaciones.data;
                                this.$store.commit("cargarPublicaciones", this.publicaciones);
                                this.$router.push('feed'); //Se redirecciona a la pagina FEED
                            })
                            .catch(e => console.log(e));
                        //this.$store.commit("changeName", "New Name");
                        /* try{
                             this.$router.push('feed'); //Se redirecciona a la pagina FEED
                         }catch (e) {
                             console.log(e);
                         }*/
                    })
                    .catch(e => console.log('Error al insertar imagen' + e));
            },
            obtenerFecha(){
                return dateFormat(new Date(), 'mediumDate')
            },
            irAFeed (){
                this.$router.push('feed');
            }
        }
    }
</script>

<style scoped>

    .card {
        background-color: white;
        width: 20rem;
        border: none;
    }
    .row {
        background-color: white;
    }
    .card-img-top {
        border-radius: 25px;
        object-fit: cover;
    }
    .card-title{
        color: black;
        font-size: 22px;
        font-family: "Arial Black";
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
    .card-img-top:hover{
        cursor: pointer;
        box-shadow: -1px 3px 10px 3px #999;
    }
    .container img {
        width: 270px;
        height: 270px;
    }
    textarea{
        resize: none;
    }
    ::placeholder {
        font-size: 13px;
        opacity: 0.6;
    }
    #tituloImagen{
        font-weight: bold;
    }
    #irFeed {
        background-color: #00BFA6;
    }
    #irFeed:hover {
        box-shadow: 5px 10px 13px #999;
    }
</style>