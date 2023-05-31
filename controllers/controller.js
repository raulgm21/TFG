// Requiere la Lógica del Modelo para establecer conexión a la BDD

var Model = require('../models/model'),
    Controller = () => {} 

const bcrypt = require('bcrypt');               // Módulo para encriptación de contraseñas
const nodemailer = require('nodemailer');       // Módulo para mandar correos
const path = require('path');                   // Módulo para interactuar con las rutas
const fs = require('fs');                       // Módulo para interactuar con los ficheros

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
                var solo_letras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
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
                var solo_letras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
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
    // Modelo que nos registra un trabajador en la BDD
    // ------------------------------------------------------ //

    Controller.registro_trabajador_submit = (req, res, next) => {

        const datos = req.body;

        var nombre          = datos.nombre.trim();
        var correo          = datos.correo.trim();
        var password        = datos.password.trim();
        var dni             = datos.dni.trim();
        var identificador   = datos.identificador.trim();
        console.log(nombre);
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
                    identificador   : identificador
                }

                // Expresiones Regulares
                var solo_letras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
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
                    validarGmail(correo) && correo.length > 12 && nombre.length >= 3 && solo_letras.test(nombre) 
                    && password.length >= 8 && validarDNI(dni)
                )
                {
        
                    Model.dni(datosActu , (docs) => {
                        
                        console.log(docs)
                        // No existe el DNI en la BDD, por lo cual es correcto
                        if(docs == null){
        
                            Model.registro_trabajador_submit(datosActu, () => { res.send("Correcto"); }) 
        
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
    // Modelo que nos inserta un trabajador IDENTIFICADOR
    // ------------------------------------------------------ //

    Controller.insertar_personal = (req, res, next) => {

        const datos = req.body;

        var id_empresa           = datos.id_empresa.trim();
        var nombre_empresa       = datos.nombre_empresa.trim();
        var identificador        = datos.identificador.trim();
        var password             = datos.password.trim();
        var cargo                = datos.cargo.trim();
        var color                = datos.color.trim();
        
        const salting = 10;

        bcrypt.hash(password,salting, (err,hashedPassword) => {

            if(err){
                console.log(err);
            }else{
                console.log("Hash: " + hashedPassword)
                // Objeto Actualizado
                datosActu = {
                    id_empresa      : id_empresa ,
                    nombre_empresa  : nombre_empresa,
                    password        : hashedPassword,
                    identificador   : identificador,
                    cargo           : cargo,
                    color           : color
                }

               
                // Comprobamos si no existe un identificador igual en la base de datos
                Model.identificador(datosActu , (docs) => {
                        
                    console.log(docs)
                    // No existe el Identificador en la BDD, por lo cual es correcto
                    if(docs == null){
        
                        Model.registro_agregar_personal(datosActu, () => { res.send("Correcto"); }) 
        
                    }else{
                        res.send("Existe el Identificador");
                    }
                        
                })
           
            }
        })

    }

    // ------------------------------------------------------ //
    // Modelo que nos manda un correo a un usuario de la empresa
    // ------------------------------------------------------ //

    Controller.mandar_correo = (req, res, next) => {

        const datos = req.body;
        
        var envia       = datos.envia.trim();
        var recibe      = datos.recibe.trim();
        var mensaje     = datos.mensaje.trim();
        var estado      = datos.estado.trim();

        OBJDATOS = { 
            envia : envia,
            recibe : recibe,
            mensaje : mensaje,
            estado : estado
        }

        console.log(OBJDATOS)
        
        Model.mandar_correo(OBJDATOS , (docs) => { res.send("Correcto"); })
    }

    // ------------------------------------------------------ //
    // Modelo que nos manda recibe todos los correos del usuario activo
    // ------------------------------------------------------ //

    Controller.consultar_correo = (req, res, next) => {

        const datos = req.body;
        
        var envia       = datos.envia.trim();

        OBJDATOS = { 
            envia : envia,
        }

        console.log(OBJDATOS)
        
        Model.consultar_correo(OBJDATOS , (docs) => { 
            console.log(docs);
            if(docs){
                res.send(docs); 
            }else{
                res.send("No hay correos");
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

    // ------------------------------------------------------ //
    // Modelo que nos comprobará si existe o no el usuario identificado 
    // para asi empezar a registrar a nuestro trabajador con sus datos
    // ------------------------------------------------------ //

    Controller.consultar_trabajador_identificador = (req, res, next) => {
        
        comprobar = {
            identificador      : req.body.identificador,
            password           : req.body.password
        }

        Model.identificador(comprobar , (docs) => {
           
            // Si no existe en la BDD
            if(docs != null){

                // Obtengo las contraseña de la BDD
                var contraseña = docs.password;

                // Comparo la contraseña encriptada con la contraseña del formulario
                bcrypt.compare(req.body.password, contraseña, (err, result) => {

                    if(err){
                        console.log(err);

                    }else if (result) {
                        res.send("Correcto");
                    }else{
                        res.send("Error");
                    }

                })

            }else{
                
                res.send("Error");
            }

        })
    }

    // ------------------------------------------------------ //
    // Modelo que nos envia un correo sobre opciones de Contacto
    // ------------------------------------------------------ //

    Controller.contacto_correo = (req, res, next) => {

        const datos     = req.body;

        var correo      = datos.correo.trim();
        var asunto      = datos.asunto.trim();
        var descripcion = datos.descripcion.trim();

        // Verificación desde servidor
        if(correo.length != 0 && asunto.length != 0 && descripcion.length != 0){

            Model.correo(datos , (docs) => {
                
                console.log(docs)
                if(docs != null){
                    
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'raulgomeeez21@gmail.com',
                            pass: 'frnslfimulbxfdbr'
                        }
                    });
                    
                    const mailOptions = {
                        from: 'raulgomeeez21@gmail.com', 
                        to: 'raulgomeeez21@gmail.com',
                        subject: `TeamWork: ${correo} - ${asunto}`,
                        html: 
                        `
                        <h1>Más información sobre el correo recibido:</h1> 
                        ${descripcion}
                        `
                    };
        
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Correo electrónico enviado: ' + info.response);
                            
                        }
                    });

                    res.send("Correcto");


                }else{
                    res.send("Error");
                }
                
            })

        }else{
            console.log("MAL");
            res.send("Vacio");
        }

       

    }

    // ------------------------------------------------------ //
    // Modelo que nos actualizará el tutorial del usuario a NO.
    // ------------------------------------------------------ //

    Controller.tutorialNO = (req, res, next) => {

        const datos = req.body;
        
        var dni     = datos.dni.trim();
        
        OBJDATOS = { dni : dni }

        Model.tutorialNO(OBJDATOS , (docs) => {
            
            if(docs){
                res.send("Correcto");
            }else{
                res.send("Error");
            }
            
        })
    }

    // ------------------------------------------------------ //
    // Modelo que nos actualizará si aparece o no en la búsqueda.
    // ------------------------------------------------------ //

    Controller.aparecer_oferente = (req, res, next) => {

        const datos = req.body;
        
        var id_empresa       = datos.id_empresa.trim();
        var aparece_oferente = datos.aparece_oferente.trim();
        
        OBJDATOS = { 
            id_empresa : id_empresa,
            aparece_oferente : aparece_oferente
        }
        console.log(OBJDATOS);
        Model.aparecer_oferente(OBJDATOS , (docs) => { res.send("Correcto"); })

    }
    
    // ------------------------------------------------------ //
    // Modelo que nos permite cambiar el nombre
    // ------------------------------------------------------ //

    Controller.cambiar_nombre = (req, res, next) => {

        const datos = req.body;
        
        var dni     = datos.dni.trim();
        var nombre  = datos.nombre.trim();
        
        OBJDATOS = { 
            dni : dni, 
            nombre : nombre
        }

        Model.cambiar_nombre(OBJDATOS , (docs) => { res.send("Correcto"); })
    }

    // ------------------------------------------------------ //
    // Modelo que nos permite cambiar la contraseña
    // ------------------------------------------------------ //

    Controller.cambiar_password = (req, res, next) => {

        const datos = req.body;
        
        var dni          = datos.dni.trim();
        var pass_actual  = datos.pass_actual.trim();
        var pass_nueva   = datos.pass_nueva.trim();
        
        const salting = 10;


        OBJDATOS = { 
            dni      : dni, 
            password : pass_actual
        }

        Model.dni(OBJDATOS , (docs) => {
           
            // Obtengo las contraseña actual de la BDD
            var contraseña = docs.password;

            // Comparo la contraseña encriptada con la contraseña actual
            bcrypt.compare(pass_actual, contraseña, (err, result) => {

                if(err){

                    console.log(err);

                }else if (result) {

                    // Encriptamos la nueva contraseña
                    bcrypt.hash(pass_nueva,salting, (err,hashedPassword) => {
                    
                        OBJDATOS = { 
                            dni      : dni, 
                            password : hashedPassword
                        }

                        // Contraseñas Coinciden
                        Model.cambiar_password(OBJDATOS , (docs) => { res.send("Correcto"); })

                    })
                    

                }else{
                    // Contraseñas no Coinciden
                    res.send("Error");
                }

                })
        })

    }

    // ------------------------------------------------------ //
    // Modelo que nos comprará el módulo que hayamos seleccionado
    // ------------------------------------------------------ //

    Controller.comprar_modulo = (req, res, next) => {

        const datos = req.body;
        
        var ID     = datos.id_empresa.trim();
        var MODULO = datos.valor_identificador.trim();

        
        OBJDATOS = { 
            id_empresa : ID,
            id_modulo : MODULO
        }
        console.log(OBJDATOS)
        
        Model.comprar_modulo(OBJDATOS , (docs) => { res.send("Correcto"); })
    }

    // ------------------------------------------------------ //
    // Modelo que nos permite cambiar el estado de un modulo
    // ------------------------------------------------------ //

    Controller.cambiar_estado_modulo = (req, res, next) => {

        const datos = req.body;
        
        var ID     = datos.id_empresa.trim();   
        var MODULO = datos.MODULO.trim();   // nombre
        var ESTADO = datos.estado.trim();   // estado

        
        OBJDATOS = { 
            id_empresa : ID,
            id_modulo : MODULO,
            estado : ESTADO
        }
        console.log(OBJDATOS)
        
        Model.cambiar_estado_modulo(OBJDATOS , (docs) => { res.send("Correcto"); })
    }

    
    // ------------------------------------------------------ //
    // Modelo que nos acutalizará los módulos que tengamos actualmente
    // ------------------------------------------------------ //

    Controller.actualizar_modulos = (req, res, next) => {

        const datos = req.body;
        
        var ID              = datos.id_empresa.trim();
        var MOD_COLOR       = datos.MOD_COLOR.trim();
        var MOD_CALENDARIO  = datos.MOD_CALENDARIO.trim();
        var MOD_CHAT        = datos.MOD_CHAT.trim();
        var MOD_HORA        = datos.MOD_HORA.trim();

        
        OBJDATOS = { 
            id_empresa : ID,
            MOD_COLOR : MOD_COLOR,
            MOD_CALENDARIO : MOD_CALENDARIO,
            MOD_CHAT : MOD_CHAT,
            MOD_HORA : MOD_HORA
        }
        
        Model.actualizar_modulos(OBJDATOS , (docs) => { res.send("Correcto"); })
    }

    // ------------------------------------------------------ //
    // MODULO COLOR -> CAMBIAR COLOR
    // ------------------------------------------------------ //

    Controller.moduloColor_cambiarColor = (req, res, next) => {

        const datos = req.body;
        
        var ID     = datos.id_empresa.trim();
        var COLOR  = datos.color.trim();

        
        OBJDATOS = { 
            id_empresa : ID,
            color      : COLOR
        }
        
        Model.moduloColor_cambiarColor(OBJDATOS , (docs) => { res.send("Correcto"); })
    }

    // ------------------------------------------------------ //
    // Modelo que nos obtiene todos los trabajadores de la empresa
    // ------------------------------------------------------ //

    Controller.mostrar_personal = (req, res, next) => {

        const datos = req.body;
        
        var id_empresa = datos.id_empresa.trim();
        
        OBJDATOS = { id_empresa : id_empresa }

        Model.mostrar_personal(OBJDATOS , (docs) => {
            
            console.log(docs);
            if(docs){
                res.send(docs);
            }else{
                res.send("Error");
            }
            
        })
    }
    
    // ------------------------------------------------------ //
    // Modelo que nos obtiene todas las empresas que buscan oferentes
    // ------------------------------------------------------ //

    Controller.mostrar_empresas = (req, res, next) => {

        Model.mostrar_empresas((docs) => {
            
            console.log(docs);
            if(docs){
                res.send(docs);
            }else{
                res.send("Error");
            }
            
        })
    }

    // ------------------------------------------------------ //
    // Modelo que nos elimina un trabajador mediante DNI.
    // ------------------------------------------------------ //

    Controller.eliminar_personal_dni = (req, res, next) => {
        
        const datos = req.body;
       
        var dni = datos.dni.trim();
        
        OBJDATOS = {
            dni : dni
        }

        Model.eliminar_personal_dni(OBJDATOS , (docs) => {
            
            res.send("Correcto");

        })

    }

    // ------------------------------------------------------ //
    // Modelo que nos elimina un trabajador mediante ID.
    // ------------------------------------------------------ //

    Controller.eliminar_personal_id = (req, res, next) => {
        
        const datos = req.body;
       
        var identificador = datos.identificador.trim();
        
        OBJDATOS = {
            identificador : identificador
        }

        Model.eliminar_personal_id(OBJDATOS , (docs) => {
            
            res.send("Correcto");

        })

    }


    // ------------------------------------------------------ //
    // Modelo que nos permite subir una foto de perfil
    // ------------------------------------------------------ //

    Controller.subir_foto = (req, res, next) => {

        const datos     = req.body;

        var dni         = datos.dni.trim();
       
        const extension         = path.extname(req.file.originalname);
        const nombreArchivo     = dni + extension;
        const rutaArchivo       = path.join('./public/img/perfil/', nombreArchivo);

        fs.rename(req.file.path, rutaArchivo, (error) => {
            if(error) {
                console.log(error);
                res.send('Error al subir la imagen');
            } 
        });

        // Modificar el documento añadiendo la foto de pefil
        OBJDATOS = { dni : dni,}

        Model.foto_perfil(OBJDATOS , (docs) => { })

        res.redirect('/iniciarSesion');

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
    // Vista que nos mostrará las preguntas más frecuentes al asistente
    // ------------------------------------------------------ //

    Controller.asistente = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Asistente',
            description : ''
        }
        
        res.render('asistente', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Footer que nos mostrará los Términos y Condiciones
    // ------------------------------------------------------ //

    Controller.terminos_condiciones = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ Términos y Condiciones',
            description : ''
        }
        
        res.render('terminos-condiciones', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Footer que nos mostrará la Privacidad de Datos
    // ------------------------------------------------------ //

    Controller.privacidad_datos = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~  Privacidad de Datos',
            description : ''
        }
        
        res.render('privacidad-datos', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Footer que nos mostrará el Aviso Legal
    // ------------------------------------------------------ //

    Controller.aviso_legal = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~  Aviso Legal',
            description : ''
        }
        
        res.render('aviso-legal', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Footer que nos mostrará la Política de Cookies
    // ------------------------------------------------------ //

    Controller.politica_cookies = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~  Política de Cookies',
            description : ''
        }
        
        res.render('politica-cookies', locals)
                
    }

    // ------------------------------------------------------ //
    // Vista del Formulario de Contacto
    // ------------------------------------------------------ //

    Controller.contacto = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~  Contacto',
            description : ''
        }
        
        res.render('contacto', locals)
                
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
    // Vista del PRUEBA
    // ------------------------------------------------------ //
    
    Controller.prueba = (req, res, next) => {
        
        let locals = {
            title : 'TeamWork ~ PRUEBA',
            description : ''
        }
        
        res.render('prueba', locals)
                
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