const express = require ('express');
const router = express.Router();
const Imagen = require('../models/Imagen');

router.get('/feed', (req, res) => {
    Imagen.paginate({}, { page:1, limit: 3, sort: { _id: -1 } }).then((imagenes) => {
        res.send(imagenes)
    });
});
router.get('/feed/:page', (req, res) => {
    const pagina = req.params.page;
    Imagen.paginate({}, { page:pagina, limit: 3, sort: { _id: -1 } }).then((imagenes) => {
        res.send(imagenes)
    });
});
router.post('/subir-imagen', (req, res)=>{
    res.json({file: req.file});
});
router.post('/feed', (req, res)=>{
    const imagen = new Imagen(req.body);
    imagen.save().then(r => console.log(r)).catch(e => console.log(e));
    res.json({
        status: 'Imagen guardada'
    });
});
router.delete('/publicacion/:id', (req, res) => {
    const idPublicacion =  req.params.id;
    Imagen.findByIdAndDelete(idPublicacion)
        .then((resultado)=>{
            res.json(resultado);
        })
        .catch(e => console.log('Error al eliminar publicacion' + e));
});






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