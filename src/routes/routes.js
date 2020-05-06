const express = require ('express');
const router = express.Router();
const Imagen = require('../models/Imagen');

//Obtener todas las publicaciones con paginacion
router.get('/feed', (req, res) => {
    Imagen.paginate({}, { page:1, limit: 3, sort: { _id: -1 } }).then((imagenes) => {
        res.send(imagenes)
    });
});
//Obtener publicaciones con paginación
router.get('/feed/:page', (req, res) => {
    const pagina = req.params.page;
    Imagen.paginate({}, { page:pagina, limit: 3, sort: { _id: -1 } }).then((imagenes) => {
        res.send(imagenes)
    });
});
//Obtener publicación por id
router.get('/publicacion/:id', (req, res) => {
    const idPublicacion = req.params.id;
    Imagen.findById(idPublicacion)
        .then((imagen) => {
            if(imagen){
                console.log(imagen);
                res.send(imagen);
            }else {res.json({ status: 'No se encontró la publicacion', })}
        })
        .catch((e) => console.log('Error al obtener la publicacion: ' + e))
})
//Buscar publicaciones con paginacion
router.get('/feed/find/:find', (req, res) => {
    const termino = req.params.find;
    Imagen.paginate({titulo: {$regex: '.*' + termino + '.*', $options: 'i'}}, { page:1, limit: 3, sort: { _id: -1 } }).then((imagenes) => {
        res.send(imagenes)
    });
});
//Buscar MAS publicaciones con paginacion
router.get('/feed/find/:page/termino/:termino', (req, res) => {
    const termino = req.params.termino;
    const pagina = req.params.page;
    console.log('ENTRE MAS');
    console.log(pagina);
    console.log(termino);
    Imagen.paginate({titulo: {$regex: '.*' + termino + '.*', $options: 'i'}}, { page:pagina, limit: 3, sort: { _id: -1 } }).then((imagenes) => {
        res.send(imagenes)
    });
});
//Subir imagen
router.post('/subir-imagen', (req, res)=>{
    res.json({file: req.file});
});
//Subir publicacion
router.post('/feed', (req, res)=>{
    const imagen = new Imagen(req.body);
    imagen.save().then(r => {
        console.log(r);
        res.json({
            status: 'Imagen guardada'
        });
    }).catch(e => console.log(e));
});
//Insertar comentario
router.post('/comentario', (req, res) => {
    Imagen.findById(req.body.idPublicacion).then((imagen) => {
            if(imagen){
                imagen.comentarios.push(req.body.comentario);
                imagen.save().then((r) => {console.log(r)}).catch(e => console.log('Error al insertar comentario') + e)
            }else {res.json({ status: 'No se encontró la publicacion de la cual se quiere insertar el comentario', })}
        }).catch((e) => console.log('Error al obtener la publicacion de la cual se quiere insertar el comentario: ' + e))
});
//Eliminar publicacion
router.delete('/publicacion/:id', (req, res) => {
    const idPublicacion =  req.params.id;
    Imagen.findByIdAndDelete(idPublicacion)
        .then((resultado)=>{
            res.json(resultado);
        })
        .catch(e => console.log('Error al eliminar publicacion' + e));
});





//Eliminar todas las publicaciones
router.delete('/feed', (req, res)=>{
    Imagen.remove({})
        .then((resultado) => {
            console.log(resultado);
            res.json({
                status: 'REGISTROS ELIMINADOS'
            })
        }).catch(e => console.log(e));
});

module.exports = router;