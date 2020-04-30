const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

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
app.use(express.json());

//Routes
app.use('/sb', require(__dirname + '/routes/routes'));

//Static Files
app.use(express.static(__dirname + '/public'));

//Server is listening
app.listen(app.get('port'), ()=>{
   console.log('Server on port ' +  app.get('port'));
});