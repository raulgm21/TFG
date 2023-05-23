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
    // Nos consulta si existe o no el IDENTIFICADOR que le pasamos por formulario. 
    // ---------------------------------------------------------- //

    Model.identificador = (data, cb) => {
            
        conn
            .findOne({
                identificador        : data.identificador,
                identificador_activo : "SI"
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
                rol                 : 'empresario',
                tutorial            : 'none',
                color               : "#478AC9",
                cargo               : "Empresario",
                foto_perfil         : "./img/perfil/nofoto.png"
            }, 
            (err) => {
                if(err) throw err
                cb()
            })
            
    }

    // ---------------------------------------------------------- //
    // Nos añade un nuevo trabajador por parte de IDENTIFICADOR
    // ---------------------------------------------------------- //

    Model.registro_agregar_personal = (data, cb) => {

        conn
            .create(
            {
                id_empresa           : data.id_empresa,
                nombre_empresa       : data.nombre_empresa,
                password             : data.password,
                identificador        : data.identificador,
                cargo                : data.cargo,
                color                : data.color,
                tutorial             : "none",
                rol                  : "trabajador",
                identificador_activo : "SI",
                foto_perfil          : "./img/perfil/nofoto.png"

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
                rol                 : 'oferente',
                tutorial            : 'none',
                color               : "#478AC9",
                foto_perfil         : "./img/perfil/nofoto.png"
            }, 
            (err) => {
                if(err) throw err
                cb()
            })
            
    }

    // ---------------------------------------------------------- //
    // Nos edita al usuario activo para ponerle el DNI, nombre, etc
    // ---------------------------------------------------------- //

    Model.registro_trabajador_submit= (data, cb) => {
            
        conn
            .findOneAndUpdate(
                {
                    identificador : data.identificador
                },

                {
                    nombre               : data.nombre,
                    correo               : data.correo,
                    password             : data.password,
                    dni                  : data.dni,
                    identificador_activo : "NO"
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ---------------------------------------------------------- //
    // Nos edita al usuario activo para ponerle el tutorial en NO
    // ---------------------------------------------------------- //

    Model.tutorialNO= (data, cb) => {
            
        conn
            .findOneAndUpdate(
                {
                    dni : data.dni
                },

                {
                    tutorial : "NO"
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ---------------------------------------------------------- //
    // Nos edita al usuario añadiendo la foto que le hemos asignado
    // ---------------------------------------------------------- //

    Model.foto_perfil= (data, cb) => {
            
        conn
            .findOneAndUpdate(
                {
                    dni : data.dni
                },

                {
                    foto_perfil : "./img/perfil/" + data.dni + ".png"
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ---------------------------------------------------------- //
    // Nos muestra todo el personal que hay en la empresa
    // ---------------------------------------------------------- //

    Model.mostrar_personal= (data, cb) => {
            
        conn
            .find
            (
                {
                    id_empresa : data.id_empresa
                }
            )
            .exec((err, docs) => {

                if(err) throw err
                cb(docs)
            })
            
    }

// ******************************************************************************************** //
//                                      Exportación del Modulo
// ******************************************************************************************** //

module.exports = Model