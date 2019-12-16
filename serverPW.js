//Iniciando la configuración del servidor

var port = process.env.PORT || 5025; //Puerto de la aplicacion

//#region DEPENDENCIAS
var favicon = require('serve-favicon');
const express = require('express');
var app = express();

const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//const engine = require('ejs-locals');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');
const util = require('util');
//const html2canvas = require('html2canvas');
//#endregion

//#region SANITIZER pruebas
var fs = require('fs');
var sanitizer = require('sanitizer');
//#endregion

//engine  = require 'ejs-locals';
//app.engine('ejs', engine)
var http = require('http');//.Server(app);
app.use(cookieParser());
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'html');

app.set('views', path.join(__dirname, '/app/views'));
//#region SANITIZER pruebas
app.use(favicon(path.join(__dirname, '/public', 'images/ico', 'favicon.ico')));
// parse application/json
//app.use(bodyParser.json());
app.use(cors());
//#endregion

/*app.use(multer({
	dest: './uploads/',
	rename: function (fieldname, filename) {
	  return filename;
	}
}));*/
//#region CONTRASEÑAS
//const bcrypt = require('./bcrypt');
// const bcrypt = require('bcrypt');
/*bcrypt.hash('myPassword', 10, function (err, hash) {
	// Store hash in database
});
bcrypt.compare('somePassword', hash, function (err, res) {
	if (res) {
		// Passwords match
	} else {
		// Passwords don't match
	}
});*/
//#endregion

//#region MONGODB
const MongoStore = require('connect-mongo')(session); // Se usa par aguardar las sessiones en mongodb
const conn = require('./conexionMongoDB');
app.use(session({
	secret: 'keyafrocaq2018',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: conn,
	})
}));

//#endregion



//#region UPLOADS DE ARCHIVOS
// Init gfs
let gfs;

conn.once('open', () => {
	// Init stream
	console.log("Iniciando ...");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
	url: 'mongodb://167.86.127.137:27037/cds_pw_maya',
	//url: 'mongodb://127.0.0.1:27017/cds_afrocaq',
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
//const upload = multer({dest: 'uploads/'});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
app.get('/otro', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {

			res.sendfile('./public/index.html');
			//res.render('./public/index.html', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
				}
				//file.idNoticia = "500"

			//console.log(file.filename);
			});


			res.send({msg:"EXITO EN LA OPERACIÓN"});
      //res.render('./public/index.html', { files: files });
    }
  });
});
// @route POST /upload
// @desc  Uploads file to DB
app.post('/uploadno', upload.single('file'),   (req, res) => {
	console.log('Request received: ');
	//util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
	util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

	res.writeHead(200, { 'Content-Type': 'text/plain' });
	req.on('data', function (chunk) {
			console.log('GOT DATA!');
	});
	console.log(req.file);
	res.end('{"msg": "OK","nombre": "'+req.file.filename+'"}');
});
// @route POST /upload
// @desc  Uploads file to DB
app.post('/uploadga', upload.single('fileGA'),   (req, res) => {
	console.log('Request received: ');
	//util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
	util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

	res.writeHead(200, { 'Content-Type': 'text/plain' });
	req.on('data', function (chunk) {
			console.log('GOT DATA!');
	});
	console.log(req.file);
	res.end('{"msg": "OK","nombre": "'+req.file.filename+'"}');
});
// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('fileG'),   (req, res) => {
	// res.json({ file: req.file });
	//console.log('Cargando...'+req.file);
	//res.send(file);
	//res.redirect('/otro');
	//res.send({msg:"EXITO EN LA OPERACIÓN"});
	//we probably want to send an object back in response to the request
	/*var returnObject = {message: "Hello World!"};
	var returnObjectString = JSON.stringify(returnObject);

	//push back the response including the callback shenanigans
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end(callback + '(\'' + returnObjectString + '\')');*/
/*
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('_testcb(\'{"message": "Hello world!"}\')');*/

	console.log('Request received: ');
	//util.log(util.inspect(req)) // this line helps you inspect the request so you can see whether the data is in the url (GET) or the req body (POST)
	util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url) // this line logs just the method and url

	res.writeHead(200, { 'Content-Type': 'text/plain' });
	req.on('data', function (chunk) {
			console.log('GOT DATA!');
	});
	console.log(req.file);
	res.end('{"msg": "OK","nombre": "'+req.file.filename+'"}');
	 //res.status(200).json({msg:'EXITO EN LA OPERACIÓN'});
  //res. send({msg:'EXITO EN LA OPERACIÓN'});

});

/*app.post('/upload', upload.single('file'),   (req, res) => {
Upload(req, res, function (error) {
	if (error) {
			res.status(400).send(error);
	}
	var obj = {};
	obj.file = req.files.filename;
	//file is getting stored into database and after it successfully stored
	//into database it will return you Id
	conn.db.create(obj, function (err, data) {
											if (err) {
													res.send('error');
											}
											if (!data) {
													res.send('Error');
											} else {
													console.log('file upload');
													res.send(data._id);
											}
									});
					});
		});
*/



// @route GET /files
// @desc  Display all files in JSON
app.get('/files', (req, res) => {
	console.log(">");
  gfs.files.find().toArray((err, files) => {
		// Check if files
		console.log(">>");
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:id', (req, res) => {

  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
		}

		return res.json({"msg":"EXITO EN LA OPERACIÓN"});
	//res.redirect('/otro');
	//res.redirect('/');

		//res.sendfile('./public/index.html');
  });
});
//#endregion

//app.set('view engine', 'hbs');

//const VIEWS = path.join(__dirname, './public');

require('./app/routes/route.js')(app);
var Chat = require('./app/models/pageweb/chat');

//index.html routing
app.get('/', function (req, res) {
	res.render("./public/index.html");
});

// Handle 404
app.use(function (req, res) {
	res.status(400);
	res.render('./public/404.html', { title: '404: Archivo no encontrado' });
});
// Handle 500
app.use(function (error, req, res, next) {
	res.status(500);
	res.render('500.html', { title: '500: Error interno del servidor', error: error });
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST, OPTIONS');
	res.header("Access-Control-Allow-Headers", "content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept");
	next();
});

//#region ARRANCANDO EL SERVIDOR(Servicio) NODE PARA LA APLICACIÓN
var server = http.createServer(app);
server.listen(process.env.PORT || port, function () {
	console.log('API web sirviendo por el puerto: ' + port);
});
//#endregion

//#region GESTIÓN DE CONEXIONES POR SOCKETS
var usuariosOnline = {};

var io = require('socket.io')(http);
io.listen(server);
io.on('connection', function (socket) {
	console.log('Usuario conectado!');
	console.log('Total de Usuarios Conectados: ' + Object.keys(io.sockets.connected).length);
	socket.on('disconnect', function () {
		console.log("io.sockets.sockets.length: ", io.sockets.sockets.length);
	});
	//cuando un usuario envia un nuevo mensaje, el parámetro es el mensaje que ha escrito en la caja de texto
	socket.on('message', function (message) {
		console.log(message);
		//pasamos un parámetro, que es el mensaje que ha escrito,
		//ésto lo hacemos cuando el usuario pulsa el botón de enviar un nuevo mensaje
		socket.emit("update", 'Total de Usuarios Conectados: ' + Object.keys(io.sockets.connected).length + "");//con socket.emit, el mensaje es para mi
		socket.broadcast.emit("update", 'Total de Usuarios Conectados: ' + Object.keys(io.sockets.connected).length + "");//con socket.broadcast.emit, es para el resto de usuarios
	});

	socket.on("loginUser", function (username)//El parámetro es la sesión login almacenada con sessionStorage
	{
		if (usuariosOnline[username])//si existe el nombre de usuario en el chat
		{
			socket.emit("userInUse");
			return;
		}
		socket.username = username; //Guardamos el nombre de usuario en la sesión del socket para este cliente
		usuariosOnline[username] = socket.username;//añadimos al usuario a la lista global donde almacenamos usuarios
		socket.emit("update", "Bienvenido " + socket.username + ", te has conectado correctamente.");//mostramos al cliente como que se ha conectado
		socket.broadcast.emit("update", "El usuario " + socket.username + " se ha conectado al chat.");//mostramos de forma global a todos los usuarios que un usuario se acaba de conectar al chat
		//io.sockets.emit("updateSidebarUsers", usuariosOnline);//actualizamos la lista de usuarios en el chat del lado del cliente
	});

	    // Connect to Socket.io
			//io.on('connection', function(socket){

        //let Chat = 	Grid(conn.db, mongoose.mongo);
  			//Chat.collection('chats');

        // Create function to send status
        sendStatus = function(s){
            socket.emit('status', s);
        }

        // Get chats from mongo collection
        Chat.find(function(err, res){
            if(err){
                throw err;
            }
            // Emit the messages
            socket.emit('output', res);
				}).limit(100);

				/*Chat.find(
					function (err, chat) {
							if (err)
									res.send(err);

							socket.emit('output', chat);
							//res.json(chat); // devuelve todas las Chats en JSON
					}
			).limit(100);*/


        // Handle input events
        socket.on('input', function(data){
            let nombre = data.nombre;
						let mensaje = data.mensaje;

            // Check for nombre and mensaje
            if(nombre == '' || mensaje == ''){
                // Send error status
                sendStatus('Por favor ingese su nombre, luego su mensaje');
            } else {
                // Insert mensaje
                Chat.create({
									nombre: nombre,
									mensaje: mensaje},
									function(){
                    io.emit('output', [data]);

                    // Send status object
                    sendStatus({
                        mensaje: 'Mensaje enviado!',
                        clear: true
                    });
                });
            }
        });

        // Handle clear
        socket.on('clear', function(data){
            // Remove all chats from collection
            Chat.remove({}, function(){
                // Emit cleared
                socket.emit('cleared');
            });
				});

        // Handle clear
        socket.on('refresh', function(data){
					console.log("Emitiendo mensaje --- entrando",data);
					// Remove all chats from collection
					Chat.find(function(err, res){
            if(err){
                throw err;
            }
						// Emit the messages
						console.log("Emitiendo mensaje...>>>");
            socket.emit('output', res);
				}).limit(100);
			});
    //});

});
//#region SOCKET.IO borrador
//objecto para guardar en la sesión del socket a los que se vayan conectando


//var io = require("socket.io").listen(http);
//var server = http.createServer(app);

//al conectar un usuario||socket, este evento viene predefinido por socketio
/*io.sockets.on('connection', function(socket)
{
    console.log();

	//cuando el usuario conecta al chat comprobamos si está logueado
	//el parámetro es la sesión login almacenada con sessionStorage
	socket.on("loginUser", function(username)
	{
		//si existe el nombre de usuario en el chat
		if(usuariosOnline[username])
		{
			socket.emit("userInUse");
			return;
		}
		//Guardamos el nombre de usuario en la sesión del socket para este cliente
		socket.username = username;
		//añadimos al usuario a la lista global donde almacenamos usuarios
		usuariosOnline[username] = socket.username;
		//mostramos al cliente como que se ha conectado
		socket.emit("refreshChat", "yo", "Bienvenido " + socket.username + ", te has conectado correctamente.");
		//mostramos de forma global a todos los usuarios que un usuario
		//se acaba de conectar al chat
		socket.broadcast.emit("refreshChat", "conectado", "El usuario " + socket.username + " se ha conectado al chat.");
		//actualizamos la lista de usuarios en el chat del lado del cliente
		io.sockets.emit("updateSidebarUsers", usuariosOnline);
	});

	//cuando un usuario envia un nuevo mensaje, el parámetro es el
	//mensaje que ha escrito en la caja de texto
	socket.on('addNewMessage', function(message)
	{
		//pasamos un parámetro, que es el mensaje que ha escrito en el chat,
		//ésto lo hacemos cuando el usuario pulsa el botón de enviar un nuevo mensaje al chat

		//con socket.emit, el mensaje es para mi
		socket.emit("refreshChat", "msg", "Yo : " + message + ".");
		//con socket.broadcast.emit, es para el resto de usuarios
		socket.broadcast.emit("refreshChat", "msg", socket.username + " dice: " + message + ".");
	});

	//cuando el usuario cierra o actualiza el navegador
	socket.on("disconnect", function()
	{
		//si el usuario, por ejemplo, sin estar logueado refresca la
		//página, el typeof del socket username es undefined, y el mensaje sería
		//El usuario undefined se ha desconectado del chat, con ésto lo evitamos
		if(typeof(socket.username) == "undefined")
		{
			return;
		}
		//en otro caso, eliminamos al usuario
		delete usuariosOnline[socket.username];
		//actualizamos la lista de usuarios en el chat, zona cliente
		io.sockets.emit("updateSidebarUsers", usuariosOnline);
		//emitimos el mensaje global a todos los que están conectados con broadcasts
		socket.broadcast.emit("refreshChat", "desconectado", "El usuario " + socket.username + " se ha desconectado del chat.");
	});
});
*/
//#endregion

//#endregion
// Connect to mongo
//const mongo = require('mongodb').MongoClient;
//const client = require('socket.io').listen(4000).sockets;

// Connect to mongo
/*mongo.connect('mongodb://127.0.0.1/cds_chat', function(err, db){
    if(err){
        throw err;
    }

    console.log('MongoDB connected...');


});*/
