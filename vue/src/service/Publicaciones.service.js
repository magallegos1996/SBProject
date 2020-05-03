import Api from '../service/Api.service'

export default  {
    obtenerPublicaciones () {
        try{
            return Api().get(Api().getUri() + '/feed');

        }catch (e) { console.log(e); }
    },
    obtenerSiguientesPublicaciones (page) {
        try{
            return Api().get(Api().getUri() + '/feed/' + page );

        }catch (e) { console.log(e) }
    },
    subirImagen (formData) {
        try{
            return Api().post(Api().getUri() + '/subir-imagen', formData);
        }catch (e) { console.log(e) }
    },
    insertarPublicacion (publicacion) {
        try{
            return Api().post(Api().getUri() + '/feed', publicacion)
        }catch (e) { console.log(e); }
    }

}