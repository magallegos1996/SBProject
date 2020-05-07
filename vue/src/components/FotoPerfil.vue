<template>
    <div class="container pt-3">
        <form enctype="multipart/form-data" @submit.prevent="">
            <div class="row">
                <div v-if="!imagenValida" class="col-lg-12">
                    <img class="img-fluid mx-auto d-block" src="../assets/login.svg" alt="Login Ill">
                </div>
                <div v-else class="col-lg-12">
                    <img id="fotoPerfil" class="img-fluid mx-auto d-block rounded" :src="srcImagenSeleccionada" alt="Login Ill">
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 offset-lg-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center text-muted">Sube una foto para tu perfil</h5>
                            <v-file-input v-model="imagenPerfil" full-width :color="'#A83143'" @change="onImagenCargada" @click:clear="limpiarSeleccion" placeholder="Sube una foto" prepend-icon="mdi-camera">
                                <template v-slot:selection="{ text }">
                                    <v-chip v-if="imagenValida" small label :color="'#FCBFB7'"><b>{{ text }}</b></v-chip>
                                </template>
                            </v-file-input>
                            <div class="row">
                                <div class="col">
                                    <button id="cargarFoto" class="btn btn-primary btn-block" v-on:click="validarFotoPerfil">Cargar mi foto</button>
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

    import UsuarioService from '../service/Usuario.service';
    import Usuario from '../models/Usuario';
    import PublicacionService from '../service/Publicaciones.service'

    export default {
        name: "FotoPerfil",
        data () {
            return {
                imagenValida: false,
                file: '',
                error: '',
                imagenPerfil: [],
                formatosValidos : ['image/jpg', 'image/jpeg'],
                srcImagenSeleccionada: '',
            }
        },
        props: {
          nombreUsuario: {
            type: String,
            required: true,
            default: ''
          },
        },
        methods: {
            limpiarSeleccion(){
                this.imagenValida = false;
            },
            onImagenCargada(){
                const fileReader = new FileReader();
                if(this.validarArchivo(this.imagenPerfil)){
                    this.imagenValida = true;
                    this.error = '';
                    fileReader.addEventListener('load', () => {
                        this.srcImagenSeleccionada = fileReader.result;
                    });
                    fileReader.readAsDataURL(this.imagenPerfil);
                }
            },
            validarArchivo(file) {
                //Validar si es imagen jpg o jpeg
                if(file){
                    const MAX_SIZE = 20000000; //bytes;
                    console.log('SIZE:');
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
                    this.error = 'No has seleccionado ninguna imagen';
                }
            },
            validarFotoPerfil() {
                if(this.srcImagenSeleccionada === ''){
                    this.error = 'Debes seleccionar una imagen'
                }else{
                    this.subirFotoPerfil();
                }
            },
            async subirFotoPerfil() {
                const formData = new FormData();
                formData.append('imagenASubir', this.imagenPerfil);
                try {
                    const fotoPerfil = await PublicacionService.subirImagen(formData);
                    await this.guardarUsuario(fotoPerfil);
                }catch (e) { console.log('No se pudo subir la imagen: ' + e); this.mostrarNotificacion('error'); }
            },
            async guardarUsuario(fotoPerfil){
                const usuarioAInsertar = new Usuario();
                //SE CONSTRUYE OBJETO DE USUARIO A INSERTAR
                usuarioAInsertar.nombre = this.nombreUsuario;
                usuarioAInsertar.avatarPath = fotoPerfil.data.file.path;

                try{
                    await UsuarioService.insertarUsuario(usuarioAInsertar);
                    this.$emit('usuario-registrado', usuarioAInsertar.nombre);
                }catch (e) { console.log('Error al registrar usuario' + e)}

            },
        }
    }
</script>

<style scoped>
    img {
        width: 300px;
        height: 300px;
    }
    #fotoPerfil{
        width: 300px;
        height: 300px;
        object-fit: cover;
    }
    #cargarFoto {
        background-color: #2C79A5;
        color: white;
        font-weight: bold;
        opacity: 0.7;
        transition: 0.3s;
        border: none;
    }

</style>