//var app = angular.module('MainAppSesiones', []);

exports.getIdentificacion = function(req, res){
   res.render('./public/pricing');
};
exports.postIdentificacion = function(req, res){
   req.session.usuario = req.body.usuario;
   res.redirect('/api/bienvenida');
};
exports.bienvenida = function(req, res){
   if(req.session.usuario){
       console.log("Usuario:"+ req.session.usuario);
       res.sendFile('./public/pricing');
      //res.render('pricing', {nombre: req.session.usuario});
   }else{
      //res.redirect('/api/identificacion');
   }
};

exports.salir = function(req, res){
   req.session.usuario = null;
   res.redirect('/api/identificacion');
};

