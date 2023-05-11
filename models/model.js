// Requiere la conexión a la BDD

var conn = require('./model-connection'),
    Model = () => {} 

    // ---------------------------------------------------------- //
    // Nos consulta si existe o no el DNI que le pasamos por formulario. 
    // ---------------------------------------------------------- //

    Model.dni = (data, cb) => {
            
        conn
            .findOne({
                dni   : data.dni,
            })
            .exec((err, docs) => {
                if(err) throw err
                cb(docs)
            })
    }

    // ---------------------------------------------------------- //
    // Nos consulta el correo que le pasamos por formulario. Sirve
    // para mandar correos, inicio de sesión y registro.
    // ---------------------------------------------------------- //

    Model.correo = (data, cb) => {
            
        conn
            .findOne({
                correo   : data.correo,
            })
            .exec((err, docs) => {
                if(err) throw err
                cb(docs)
            })
    }
    
    // ---------------------------------------------------------- //
    // Nos añade un nuevo empresario en la BDD.
    // ---------------------------------------------------------- //

    Model.registro_empresario_submit = (data, cb) => {

        conn
            .create(
            {
                nombre              : data.nombre,
                correo              : data.correo,
                password            : data.password,
                dni                 : data.dni,
                nombre_empresa      : data.nombreEmpresa,
                actividad_empresa   : data.actividad,
                id_empresa          : data.dni + "-" +data.nombreEmpresa,
                rol                 : 'empresario'
            }, 
            (err) => {
                if(err) throw err
                cb()
            })
            
    }

    // ---------------------------------------------------------- //
    // Nos añade un nuevo oferente en la BDD.
    // ---------------------------------------------------------- //

    Model.registro_oferente_submit = (data, cb) => {

        conn
            .create(
            {
                nombre              : data.nombre,
                correo              : data.correo,
                password            : data.password,
                dni                 : data.dni,
                actividad_empresa   : data.actividad,
                rol                 : 'oferente'
            }, 
            (err) => {
                if(err) throw err
                cb()
            })
            
    }


// ******************************************************************************************** //
//                                      Exportación del Modulo
// ******************************************************************************************** //

module.exports = Model