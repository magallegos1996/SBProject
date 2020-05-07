<template>
    <div>
        <div v-if="usuarioRegistrado">
            <Credenciales
                    @validar-usuario="validarUsuario"
                    :nombreUsuario="nombreUsuario"
            />
        </div>
        <div v-else>
            <FotoPerfil
                    @usuario-registrado="irAHome"
                    :nombreUsuario="nombreUsuario"
            />
        </div>
    </div>
</template>

<script>
    import Credenciales from "./Credenciales";
    import FotoPerfil from "./FotoPerfil";
    import UsuarioSerice from "../service/Usuario.service"

    export default {
        name: "Login",
        data () {
            return {
                nombreUsuario: '',
                usuarioRegistrado: true,
            }
        },
        components: {
            Credenciales,
            FotoPerfil
        },
        methods: {
            async validarUsuario(nombreUsuario){
                const resultado = await UsuarioSerice.obtenerUsuario(nombreUsuario);
                if(resultado.data !== ''){
                    await this.irAHome(nombreUsuario)
                }else{
                    this.nombreUsuario = nombreUsuario
                    this.usuarioRegistrado = false;
                }
            },
            irAHome(nombreUsuario){
                localStorage.setItem('LogUser', nombreUsuario);
                this.$router.push('home');
            }
        }
    }
</script>

<style scoped>
</style>