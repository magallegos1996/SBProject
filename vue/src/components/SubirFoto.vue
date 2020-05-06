<template>
    <div class="container">
        <div class="col-lg-12 pr-5">
            <v-btn fab dark fixed top left slot="activator" v-bind:color="'#00BFA6'" @click="irAHome"><font-awesome-icon icon="arrow-left"/></v-btn>
        </div>
        <div class="col-lg-4 offset-lg-4">
            <form enctype="multipart/form-data" @submit.prevent="subirImagen">
                <div class="card mt-3">
                    <div class="container text-center">
                        <label for="image">
                            <input type="file" name="image" id="image" style="display:none;" @change="onImageSelected"/>
                            <img v-if="imagenSeleccionada === ''" class="card-img-top img-fluid text-center" @mouseover="hover = true" @mouseleave="hover = false" src="../assets/photo-icon.png" alt="Card image cap">
                            <img v-else class="card-img-top img-fluid text-center" @mouseover="hover = true" @mouseleave="hover = false" :src="imagenSeleccionada" alt="Card image cap">
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
                        <button class="btn btn-block">¡SUBIR FOTO!</button>
                        <small class="text-danger text-center"><b>{{error}}</b></small>
                    </div>
                </div>
            </form>
        </div>
        <Notificacion ref="notificacion"
                      :mensaje="mensajeNotificacion"
        />
    </div>
</template>

<script>

    import Imagen from '../models/Imagen';
    import Notificacion from "./Notificacion";
    import dateFormat from 'dateformat';
    import { AuthService } from "../service/auth.service";
    import PublicacionesService from '../service/Publicaciones.service'

    export default {
        name: "SubirFoto",
        data() {
            return {
                tituloIngresado: '',
                descripcionIngresada: '',
                hover: false,
                imagenSeleccionada: '',
                formatosValidos : ['image/jpg', 'image/jpeg'],
                error: '',
                imagenValida: false,
                objImagen: new Imagen(),
                archivoImagen: '',
                estaAutenticado: false,
                mensajeNotificacion: '',
            }
        },
        components: {
            Notificacion,
        },
        mounted() {
            if(AuthService.isAuth()){
                this.estaAutenticado = true;
            }
        },
        methods: {
            onImageSelected(e) {
                const fileReader = new FileReader();
                this.archivoImagen = e.target.files[0];

                if(this.validarArchivo(this.archivoImagen)){
                    this.imagenValida = true;
                    this.error = '';

                    fileReader.addEventListener('load', () => {
                        this.imagenSeleccionada = fileReader.result;
                    });
                    fileReader.readAsDataURL(this.archivoImagen);
                }
            },
            async subirImagen() {
                if(this.imagenSeleccionada === '' || !this.imagenValida) {
                    this.error = 'Por favor, seleccione una imagen';
                }else{
                    if(this.tituloIngresado.trim() === ''){
                        this.error = 'El título es obligatorio';
                    }else{
                        const formData = new FormData();
                        formData.append('imagenASubir', this.archivoImagen);
                        try {
                            const imagenGuardada = await PublicacionesService.subirImagen(formData);
                            this.subirPublicacion(imagenGuardada);
                        }catch (e) { console.log('No se pudo subir la imagen: ' + e); this.mostrarNotificacion('error'); }
                    }
                }
            },
            async subirPublicacion(imagenGuardada){
                 console.log(imagenGuardada.data.file);
                //Construccion objeto
                this.objImagen.titulo = this.tituloIngresado.trim();
                this.objImagen.nombre = imagenGuardada.data.file.filename;
                console.log(process.cwd());
                this.objImagen.path = imagenGuardada.data.file.path;
                this.objImagen.tipoImagen = imagenGuardada.data.file.mimetype;
                this.objImagen.descripcion = this.descripcionIngresada.trim();
                this.objImagen.fechaSubida = this.obtenerFechaYHora()[0];
                this.objImagen.horaSubida = this.obtenerFechaYHora()[1];
                this.objImagen.subidoPor = localStorage.getItem('LogUser');

                try{
                    await PublicacionesService.insertarPublicacion(this.objImagen);
                    this.mostrarNotificacion('exito');
                }catch (e) { console.log('Error al subir la publicación: ' + e); this.mostrarNotificacion('error')}
            },
            validarArchivo(file) {
                //Validar si es imagen jpg o jpeg
                if(file){
                    const MAX_SIZE = 20000000; //bytes;
                    console.log(file.size);
                    if(!this.formatosValidos.includes(file.type)){
                        this.error = 'Solo puedes subir imágenes';
                        return false;
                    }else{
                        if(file.size > MAX_SIZE){
                            this.error = 'El tamaño de la imagen es muy grande (Max: 2 MB)';
                            return false;
                        }else{
                            return true;
                        }
                    }
                }else{
                    this.error = 'No ha seleccionado ninguna imagen';
                }
            },
            async irAHome (){
                await PublicacionesService.obtenerPublicaciones();
                this.$router.push('home');
            },
            obtenerFechaYHora(){
                let fechaYHora = [];
                fechaYHora = [dateFormat(new Date(), 'mediumDate'), dateFormat(new Date(), 'shortTime')];
                return fechaYHora;
            },
            mostrarNotificacion(tipo){
                if(tipo === 'exito'){
                    this.mensajeNotificacion = 'La publicación se ha guardado';
                    this.$refs.notificacion.showNotificacionUploaded()
                }else{
                    this.mensajeNotificacion = 'Algo salió mal. Inténtalo de nuevo';
                    this.$refs.notificacion.showNotificacionError()
                }
            },
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
</style>