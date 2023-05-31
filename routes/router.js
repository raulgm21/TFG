//------------------------------------------------------------------------------------------------------//
//      ********          ******        **      **      **********      **********      ********        //
//      ********          ******        **      **      **********      **********      ********        //
//      **      **      **      **      **      **          **          **              **      **      //
//      **      **      **      **      **      **          **          **              **      **      //
//      **      **      **      **      **      **          **          ********        **      **      //
//      **      **      **      **      **      **          **          ********        **      **      //
//      ********        **      **      **      **          **          **              ********        //
//      ********        **      **      **      **          **          **              ********        //
//      **      **        ******          ******            **          **********      **      **      //
//      **      **        ******          ******            **          **********      **      **      //
//------------------------------------------------------------------------------------------------------//

    //----------------------------------------------------------------------//
    // El fichero router.js es uno de los puntos fuertes de Express, es     //
    // quien gestiona todo el enturado de nuestra Aplicación, todas las     //
    // rutas del enturador se encontrarán en el directorio 'views'          //
    // aplicación.                                                          //
    //----------------------------------------------------------------------//

    // Módulo para subir imágenes
    const multer = require('multer');               
    const upload = multer({ 
        dest: './public/img/perfil/',
        limits: {
            fileSize: 1048576 // 1MB
        },
        fileFilter: (req, file, callback) => {
            if(file.mimetype === 'image/png') {
                callback(null, true);
            } else {
                callback(new Error('La imagen debe ser de la extensión PNG'));
            }
        }
    });
    
    // Creamos una variable para el Framework Express, y otra variable para su módulo Router.
    
    var Controller = require('../controllers/controller'),
        express = require('express'),
        router  = express.Router()

// ********************************************************************* //
//                       Router de nuestra Aplicación                    //
// ********************************************************************* //

    router

        .get('/', Controller.index)

        .get('/asistente', Controller.asistente)
        
        .get('/terminos-condiciones', Controller.terminos_condiciones)
        .get('/privacidad-datos', Controller.privacidad_datos)
        .get('/aviso-legal', Controller.aviso_legal)
        .get('/politica-cookies', Controller.politica_cookies)

        .get('/contacto', Controller.contacto)
        .post('/contacto/correo', Controller.contacto_correo)

        .get('/iniciarSesion', Controller.iniciarSesion)
        
        .get('/registro', Controller.registro)
        .get('/registro/empresario', Controller.registro_empresario)
        .get('/registro/trabajador', Controller.registro_trabajador)
        .get('/registro/oferente', Controller.registro_oferente)

        .post('/registro/empresario/submit', Controller.registro_empresario_submit)
        .post('/registro/oferente/submit', Controller.registro_oferente_submit)
        .post('/registro/trabajador/submit', Controller.registro_trabajador_submit)
        .post('/consultar/trabajador/identificador', Controller.consultar_trabajador_identificador)

        .post('/home', Controller.sesion)

        .post('/insertar-personal', Controller.insertar_personal)
        .post('/mostrar-personal', Controller.mostrar_personal)
        .delete('/eliminar-personal/dni', Controller.eliminar_personal_dni)
        .delete('/eliminar-personal/id', Controller.eliminar_personal_id)

        .post('/subir-foto', upload.single('imagen'), Controller.subir_foto)

        .post('/mandar-correo', Controller.mandar_correo)
        .post('/consultar-correo', Controller.consultar_correo)

        .put('/tutorialNO', Controller.tutorialNO)
        .put('/cambiar-nombre', Controller.cambiar_nombre)
        .put('/cambiar-password', Controller.cambiar_password)

        .put('/comprar-modulo', Controller.comprar_modulo)
        .put('/actualizar-modulos', Controller.actualizar_modulos)
        .put('/cambiar-estado-modulo', Controller.cambiar_estado_modulo)

        .put('/modulos/color/cambiar-color', Controller.moduloColor_cambiarColor)
        
        .get('/prueba', Controller.prueba)
        // Uso del Error 404
       // .use(Controller.error404)

// ********************************************************************* //
//                         Exportación del Módulo.                       //
// ********************************************************************* //

module.exports = router