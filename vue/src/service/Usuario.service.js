import Api from '../service/Api.service'

export default {
    obtenerUsuario (nombreUsuario) {
        try{
            return Api().get(Api().getUri() + '/usuario/' + nombreUsuario);
        }catch (e) { console.log(e); }
    },
    insertarUsuario (usuario) {
        try{
            return Api().post(Api().getUri() + '/usuario', usuario);
        }catch (e) { console.log(e); }
    }
}