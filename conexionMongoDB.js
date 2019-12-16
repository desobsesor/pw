
//#region MONGODB
// Configuracion mongodb

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://167.86.127.137:27037/cds_pw_maya';

mongoose.connect(uri, {
        useNewUrlParser: true 
    })
    .then(function () {
        console.log('La conexión con MongoDB se ha establecido exitosamente!');
    }).catch(function (err) {
        console.log('No se ha podido establecer la conexión con MongoDB');
        console.log(err.message);
    });

module.exports = mongoose.connection;  
//#endregion