var Empresa = require('../../models/company/empresa');

// validar empresa
exports.getEmpresas = function (req, res) {
    Empresa.find({ empresa: req.params.empresa, passwordHash: req.params.password },
        function (err, empresa) {
            if (err)
                res.send(err);
            res.json(empresa); // devuelve todos los registros en base a una busqueda	
        }
    );
};

// Obtiene todos los objetos Empresa de la base de datos
exports.getEmpresa = function (req, res) {
    Empresa.find(
        function (err, empresa) {
            if (err)
                res.send(err);
            res.json(empresa); // devuelve todos los registros		
        }
    );
};

// Guarda un objeto Empresa en base de datos
exports.setEmpresa = function (req, res) {

    // Creo el objeto Empresa
    Empresa.create(
        {
            empresa: req.body.empresa,
            codigo: req.body.codigo,
            descripcion: req.body.descripcion
        },
        function (err, empresa) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las empresas tras crear una de ellas
            Empresa.find(function (err, empresa) {
                if (err)
                    res.send(err);
                res.json(empresa);
            });
        });
};

// Modificamos un objeto Empresa de la base de datos
exports.updateImagenEmpresa = function (req, res) {
    Empresa.update({ _id: req.params.empresa_id },
        { $set: { imagen: req.params.empresa_imagen } },
        function (err, empresa) {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // Obtine y devuelve todas las empresas tras crear una de ellas
            Empresa.find(function (err, empresa) {
                if (err)
                    res.send(err)
                res.json(empresa);
            });
        });
};

// Modificamos un objeto Empresa de la base de datos
exports.updateEmpresa = function (req, res) {
    Empresa.update({ _id: req.params.empresa_id },
        {
            $set: {
                empresa: req.body.empresa,
                codigo: req.body.codigo,
                descripcion: req.body.descripcion
            }
        },
        function (err, empresa) {
            if (err)
                res.send(err);

            // Obtine y devuelve todas las empresas tras crear una de ellas
            Empresa.find(function (err, empresa) {
                if (err)
                    res.send(err);
                res.json(empresa);
            });
        });
};

// Elimino un objeto Empresa de la base de Datos
exports.removeEmpresa = function (req, res) {
    Empresa.remove({ _id: req.params.empresa_id }, function (err, empresa) {
        if (err)
            res.send(err);

        // Obtine y devuelve todas las empresas tras borrar una de ellas
        Empresa.find(function (err, empresa) {
            if (err)
                res.send(err);
            res.json(empresa);
        });
    });
};