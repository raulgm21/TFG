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

        .post('/home', Controller.sesion)

        .post('/registro/empresario/submit', Controller.registro_empresario_submit)
        .post('/registro/oferente/submit', Controller.registro_oferente_submit)

        
        
        // Uso del Error 404
       // .use(Controller.error404)

// ********************************************************************* //
//                         Exportación del Módulo.                       //
// ********************************************************************* //

module.exports = router