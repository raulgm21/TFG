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
                foto_perfil         : "./img/perfil/nofoto.png",
                aparece_oferente    : "NO",
                MOD_COLOR           : "NO",
                MOD_CHAT            : "NO",
                MOD_CALENDARIO      : "NO",
                MOD_HORA            : "NO",
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
                foto_perfil          : "./img/perfil/nofoto.png",
                identificador_activo : "SI"

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
                foto_perfil         : "./img/perfil/nofoto.png",
                cargo               : "Oferente",
            }, 
            (err) => {
                if(err) throw err
                cb()
            })
            
    }

    // ---------------------------------------------------------- //
    // Nos añade un nuevo mensaje de correo
    // ---------------------------------------------------------- //

    Model.mandar_correo = (data, cb) => {

        conn
            .create(
            {
                envia   : data.envia,
                recibe  : data.recibe,
                mensaje : data.mensaje,
                estado  : data.estado

            }, 
            (err) => {
                if(err) throw err
                cb()
            })
            
    }

    // ---------------------------------------------------------- //
    // Nos devuelve todos los correos del usuario
    // ---------------------------------------------------------- //

    Model.consultar_correo = (data, cb) => {

        conn
            .find({
                $or: [
                    { envia: data.envia },
                    { recibe: data.envia }
                ]
            })
            .sort({date : -1 })
            .exec((err, docs) => {
            if (err) throw err;
                cb(docs);
            });
    }

    
    // ---------------------------------------------------------- //
    // Nos edita al usuario activo para ponerle el DNI, nombre, etc
    // ---------------------------------------------------------- //

    Model.registro_trabajador_submit= (data, cb) => {
            
        conn
            .findOneAndUpdate(
                {
                    identificador : data.identificador,
                    identificador_activo : "SI"
                },

                {
                    nombre               : data.nombre,
                    correo               : data.correo,
                    password             : data.password,
                    dni                  : data.dni,
                    identificador_activo : "NO",
                    
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
    // Nos edita el aparecer oferente en la busqueda
    // ---------------------------------------------------------- //

    Model.aparecer_oferente= (data, cb) => {
            
        conn
            .updateMany(
                {
                    id_empresa : data.id_empresa
                },

                {
                    aparece_oferente : data.aparece_oferente
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ---------------------------------------------------------- //
    // Nos edita el aparecer oferente en la busqueda
    // ---------------------------------------------------------- //

    Model.mostrar_empresas = (cb) => {
        
        conn
            .find(
                {
                    aparece_oferente: "SI"
                },
                {},
                (err, docs) => {
                    if (err) throw err;
                    cb(docs);
                }
        );
    };
    

    // ---------------------------------------------------------- //
    // Nos edita al usuario activo para ponerle el nuevo nombre
    // ---------------------------------------------------------- //

    Model.cambiar_nombre= (data, cb) => {
            
        conn
            .findOneAndUpdate(
                {
                    dni : data.dni
                },

                {
                    nombre : data.nombre
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ---------------------------------------------------------- //
    // Nos edita al usuario activo para ponerle la nueva contraseña
    // ---------------------------------------------------------- //

    Model.cambiar_password= (data, cb) => {
            
        conn
            .findOneAndUpdate(
                {
                    dni : data.dni
                },

                {
                    password : data.password
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ---------------------------------------------------------- //
    // Nos edita a todos los usuarios de la empresa, y les compra el módulo.
    // ---------------------------------------------------------- //

    Model.comprar_modulo= (data, cb) => {
         
        conn
            .updateMany(
                {
                    id_empresa : data.id_empresa
                },

                {
                    [data.id_modulo] : "SI"
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    
    // ---------------------------------------------------------- //
    // Nos cambia el estado del modulo de todos los usuarios de la empresa.
    // ---------------------------------------------------------- //

    Model.cambiar_estado_modulo= (data, cb) => {
         
        conn
            .updateMany(
                {
                    id_empresa : data.id_empresa
                },

                {
                    [data.id_modulo] : data.estado
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    
    // ---------------------------------------------------------- //
    // Nos actualiza a todos los usuarios los modulos disponibles actualmente
    // ---------------------------------------------------------- //

    Model.actualizar_modulos= (data, cb) => {
         
        conn
            .updateMany(
                {
                    id_empresa : data.id_empresa
                },

                {
                    MOD_COLOR : data.MOD_COLOR,
                    MOD_CALENDARIO : data.MOD_CALENDARIO,
                    MOD_CHAT : data.MOD_CHAT,
                    MOD_HORA : data.MOD_HORA
                }, 

                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ---------------------------------------------------------- //
    // Nos cambia el color de la interfaz con MODULO COLOR
    // ---------------------------------------------------------- //

    Model.moduloColor_cambiarColor= (data, cb) => {
         
        conn
            .updateMany(
                {
                    id_empresa : data.id_empresa
                },

                {
                    color : data.color
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

    // ------------------------------------------------------ //
    // Nos elimina un trabajador mediante DNI.
    // ------------------------------------------------------ //

    Model.eliminar_personal_dni= (data, cb) => {
            
        conn
            .findOneAndDelete(
                {
                    dni : data.dni
                }, 
                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }

    // ------------------------------------------------------ //
    // Nos elimina un trabajador mediante IDENTIFICADOR.
    // ------------------------------------------------------ //

    Model.eliminar_personal_id= (data, cb) => {
            
        conn
            .findOneAndDelete(
                {
                    identificador        : data.identificador,
                    identificador_activo : "SI"
                }, 
                (err, docs) =>{
                if(err) throw err
                cb()
            })
    }



// ******************************************************************************************** //
//                                      Exportación del Modulo
// ******************************************************************************************** //

module.exports = Model