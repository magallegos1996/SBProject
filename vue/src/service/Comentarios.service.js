import Api from '../service/Api.service'

export default {
    insertarComentario (comentario) {
        try{
            return Api().post(Api().getUri() + '/comentario', comentario)
        }catch (e) { console.log(e); }
    }
}