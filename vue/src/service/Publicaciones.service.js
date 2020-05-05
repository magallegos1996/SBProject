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
    obtenerBusqueda (find){
        try{
            return Api().get(Api().getUri() + '/feed/find/' + find );
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
    },
    eliminarPublicacion (idPublicacion) {
        try{
            return Api().delete(Api().getUri() + '/publicacion/' + idPublicacion);
        }catch (e) { console.log(e) }
    }

}