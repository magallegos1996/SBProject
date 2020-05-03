const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4 } = require('uuid');

const app = express();

mongoose.connect('mongodb://localhost/sb_database', {
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(() => console.log('BASE DE DATOS CONECTADA: ')).catch(e => console.log(e));
//Settings
app.set('port', process.env.PORT || 3000);
app.use(cors({
   origin: 'http://localhost:8080'
}));


//Middlewares
app.use(morgan('dev'));
app.use(express.json({limit: '50mb'})); //IMPORTANTE PARA MANEJAR REQUEST GRANDES. PARA MANEJO DE IMAGENES
app.use(express.urlencoded({limit: '50mb'})); //IMPORTANTE PARA MANEJAR REQUEST GRANDES. PARA MANEJO DE IMAGENES
const storage = multer.diskStorage({
   /*Si se crea una aplicaion con back-end y front-end como esta, se recomienda colocar las imagenes subidas por el usuario en la carpeta
   * publica de la aplicacion frontend. De lo contrario, l apliacion no será capaz de cargar las imagenes y no las mostrará
   * En el caso de Vue js, esa carpeta se llama PUBLIC y esta debidamente configurada en web.pack y en el index.html gracias a que se creo el
   * proyecto con VUE-CLI*/
   destination: path.join(process.cwd(), 'vue/public/img/uploads'),
   filename: (req, file, cb, filename) =>{
      cb(null, v4() + path.extname(file.originalname))
   }
});
app.use(multer({ storage: storage}).single('imagenASubir'));

//Routes
app.use('/sb', require(__dirname + '/routes/routes'));

//Static Files
console.log(process.cwd());
app.use(express.static(__dirname + '/public'));

//Server is listening
app.listen(app.get('port'), ()=>{
   console.log('Server on port ' +  app.get('port'));
});