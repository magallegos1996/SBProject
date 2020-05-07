const express = require ('express');
const router = express.Router();
const Imagen = require('../models/Imagen');
const Usuario = require('../models/Usuario')

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
                imagen.save().then((r) => {res.send(req.body.comentario)}).catch(e => console.log('Error al insertar comentario') + e)
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
//Obtener usuario por nombre
router.get('/usuario/:nombreUsuario', (req, res) => {
   const nombreUsuario = req.params.nombreUsuario;
   Usuario.findOne({nombre: nombreUsuario}).then((usuario) => {
       console.log(usuario);
       res.send(usuario);
   }).catch((e) => {console.log('Error al obtener usuario: ' + e); res.json({error: e})})
});
//Insertar nuevo usuario
router.post('/usuario', (req, res) => {
    const nuevoUsuario = new Usuario(req.body);
    nuevoUsuario.save().then((resultado) => {
        console.log(resultado);
        res.json({
            status: 'Usuario registrado'
        })
    }).catch(e => {
        console.log('Error al registrar usuario: ' + e);
        res.json({
            status: 'Error'
        })
    })
})





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
//Eliminar todos los usuarios
router.delete('/usuario', (req, res)=>{
    Usuario.remove({})
        .then((resultado) => {
            console.log(resultado);
            res.json({
                status: 'USUARIOS ELIMINADOS'
            })
        }).catch(e => console.log(e));
});

module.exports = router;