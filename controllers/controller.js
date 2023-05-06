// Requiere la Lógica del Modelo para establecer conexión a la BDD

var Model = require('../models/model'),
    Controller = () => {} 

const bcrypt = require('bcrypt');               // Módulo para encriptación de contraseñas

// ******************************************************************************************** //
// ******************************************************************************************** //
//                                             Modelos
// ******************************************************************************************** //
// ******************************************************************************************** //

    // ------------------------------------------------------ //
    // Modelo que nos registra un empresario en la BDD
    // ------------------------------------------------------ //

    Controller.registro_empresario_submit = (req, res, next) => {

        const datos = req.body;

        var nombre          = datos.nombre.trim();
        var correo          = datos.correo.trim();
        var password        = datos.password.trim();
        var dni             = datos.dni.trim();
        var nombreEmpresa   = datos.nombreEmpresa.trim();
        var actividad       = datos.actividad.trim();

        const salting = 10;

        bcrypt.hash(password,salting, (err,hashedPassword) => {

            if(err){
                console.log(err);
            }else{
                console.log("Hash: " + hashedPassword)
                
                // Objeto Actualizado
                datosActu = {
                    nombre          : nombre ,
                    correo          : correo,
                    password        : hashedPassword,
                    dni             : dni,
                    nombreEmpresa   : nombreEmpresa,
                    actividad       : actividad
                }

                 // Expresiones Regulares
                var solo_letras = /^[a-zA-Z]+$/;
                // FUNCIONES

                // Función para validar gmail (.com)
                function validarGmail(correo) {
                    var regexGmail = /^[\w.-]+@gmail\.com$/;
                    return regexGmail.test(correo);
                }

                // Función para validad DNI
                function validarDNI(dni) {
                    var letras          = "TRWAGMYFPDXBNJZSQVHLCKE";
                    var numero          = dni.substr(0,dni.length-1);
                    var letra           = dni.substr(dni.length-1,1);
                    var indice          = numero % 23;
                    var letraCorrecta   = letras.charAt(indice);
                    return letra === letraCorrecta;
                }
        
                // Validando desde Servidor
                if
                (
                    validarGmail(correo) && correo.length > 12 && nombre.length >= 3 && solo_letras.test(nombre) && password.length >= 8 
                    && nombreEmpresa.length > 0 && validarDNI(dni) && actividad != "Seleccione una categoría"
                )
                {
        
                    Model.dni(datosActu , (docs) => {
                        
                        console.log(docs)
                        // No existe el DNI en la BDD, por lo cual es correcto
                        if(docs == null){
        
                            Model.registro_empresario_submit(datosActu, () => { res.send("Correcto"); }) 
        
                        }else{
                            res.send("Error");
                        }
                        
                    })
        
                }else{
                    res.send("Error");
                }
            }
        })

    }

    // ------------------------------------------------------ //
    // Modelo que nos registra un oferente en la BDD
    // ------------------------------------------------------ //

    Controller.registro_oferente_submit = (req, res, next) => {

        const datos = req.body;

        var nombre          = datos.nombre.trim();
        var correo          = datos.correo.trim();
        var password        = datos.password.trim();
        var dni             = datos.dni.trim();
        var actividad       = datos.actividad.trim();

        const salting = 10;

        bcrypt.hash(password,salting, (err,hashedPassword) => {

            if(err){
                console.log(err);
            }else{
                console.log("Hash: " + hashedPassword)
                
                // Objeto Actualizado
                datosActu = {
                    nombre          : nombre ,
                    correo          : correo,
                    password        : hashedPassword,
                    dni             : dni,
                    actividad       : actividad
                }

                 // Expresiones Regulares
                var solo_letras = /^[a-zA-Z]+$/;
                // FUNCIONES

                // Función para validar gmail (.com)
                function validarGmail(correo) {
                    var regexGmail = /^[\w.-]+@gmail\.com$/;
                    return regexGmail.test(correo);
                }

                // Función para validad DNI
                function validarDNI(dni) {
                    var letras          = "TRWAGMYFPDXBNJZSQVHLCKE";
                    var numero          = dni.substr(0,dni.length-1);
                    var letra           = dni.substr(dni.length-1,1);
                    var indice          = numero % 23;
                    var letraCorrecta   = letras.charAt(indice);
                    return letra === letraCorrecta;
                }
        
                // Validando desde Servidor
                if
                (
                    validarGmail(correo) && correo.length > 12 && nombre.length >= 3 && solo_letras.test(nombre) && password.length >= 8 
                    && validarDNI(dni) && actividad != "Seleccione una categoría"
                )
                {
        
                    Model.dni(datosActu , (docs) => {
                        
                        console.log(docs)
                        // No existe el DNI en la BDD, por lo cual es correcto
                        if(docs == null){
        
                            Model.registro_oferente_submit(datosActu, () => { res.send("Correcto"); }) 
        
                        }else{
                            res.send("Error");
                        }
                        
                    })
        
                }else{
                    res.send("Error");
                }
            }
        })

    }

    // ------------------------------------------------------ //
    // Modelo que nos revisará si existe o no el DNI en la BDD
    // para iniciar sesión, y nos dirigira al home del user.
    // ------------------------------------------------------ //

    Controller.sesion = (req, res, next) => {
        
        sesion = {
            dni      : req.body.dni,
            password : req.body.password
        }

        Model.dni(sesion , (docs) => {
           
            // Si no existe en la BDD
            if(docs != null){

                // Obtengo las contraseña de la BDD
                var contraseña = docs.password;

                // Comparo la contraseña encriptada con la contraseña del formulario
                bcrypt.compare(req.body.password, contraseña, (err, result) => {

                    if(err){
                        console.log(err);

                    }else if (result) {
                        // Contraseñas Coinciden
                        let locals = {
                            title : 'TeamWork ~ Home',
                            description : '',
                            usuario : docs, // pasamos el objeto de la bdd
                        }
                        res.render("home", locals);
                    }else{
                        // Contraseñas no Coinciden
                        let locals = {
                            title : 'TeamWork ~ Iniciar Sesión',
                            description : ''
                        }
                        res.render("home", locals);
                    }

                })

            }else{
                // No existe en la BDD
                let locals = {
                    title : 'TeamWork ~ Iniciar Sesión',
                    description : ''
                }
                res.render("home", locals);
            }

        })
    }

// ******************************************************************************************** //
// ******************************************************************************************** //
//                                              Vistas
// ******************************************************************************************** //
// ******************************************************************************************** //

    // ------------------------------------------------------ //
    // Vista del Index, que es la vista por defecto.
    // ------------------------------------------------------ //
    
    Controller.index = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Inicio',
            description : ''
        }
        
        res.render('index', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista de Iniciar Sesión
    // ------------------------------------------------------ //

    Controller.iniciarSesion = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Iniciar Sesión',
            description : ''
        }
        
        res.render('iniciar_sesion', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Registro del Empresario
    // ------------------------------------------------------ //
    
    Controller.registro_empresario = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Registro',
            description : ''
        }
        
        res.render('registro_empresario', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Registro del Trabajador
    // ------------------------------------------------------ //
    
    Controller.registro_trabajador = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Registro',
            description : ''
        }
        
        res.render('registro_trabajador', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Registro del Oferente
    // ------------------------------------------------------ //
    
    Controller.registro_oferente = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Registro',
            description : ''
        }
        
        res.render('registro_oferente', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Registro
    // ------------------------------------------------------ //
    
    Controller.registro = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Registro',
            description : ''
        }
        
        res.render('registro', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Error, que es cuando no se produce un error404
    // ------------------------------------------------------ //
    
    Controller.error404 = (req, res, next) => {

        // Declaración del Objeto Error, es un módulo de Node.js
        let error  = new Error(),
        locals = {

            title : 'Página no Encontrada',
            error : error

        }
        // Cómo el error es un NOT_FOUND deberemos de poner 404
        error.status = 404
        
        res.render('error', locals)

    }


// ******************************************************************************************** //
//                                      Exportación del Modulo
// ******************************************************************************************** //

module.exports = Controller