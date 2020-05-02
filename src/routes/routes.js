const express = require ('express');
const router = express.Router();
const Imagen = require('../models/Imagen');

/*router.get('/feed', (req, res)=>{
    Imagen.find().then((imagenes)=>{
        res.send(imagenes)
    }).catch(e => console.log(e));
});*/

router.get('/feed', (req, res)=> {

    Imagen.paginate({}, { page:1, limit: 2, sort: { _id: -1 } }).then((imagenes) => {
        res.send(imagenes)
    });
});

router.post('/feed', (req, res)=>{
    const imagen = new Imagen(req.body);
    imagen.save().then(r => console.log(r)).catch(e => console.log(e));

    res.json({
        status: 'Imagen guardada'
    });
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