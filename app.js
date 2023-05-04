//----------------------------------------------------------------------//
//        ******          ******          ******          ********      //
//        ******          ******          ******          ********      //
//      **      **      **      **      **      **      **              //
//      **      **      **      **      **      **      **              //
//      **      **      **      **      **      **        ******        //
//      **      **      **      **      **      **        ******        //
//      **********      ********        ********                **      //
//      **********      ********        ********                **      //
//      **      **      **              **              ********        //
//      **      **      **              **              ********        //
//----------------------------------------------------------------------//  

    //----------------------------------------------------------------------//
    // El fichero apps.js es quien nos establece toda la gestión de la      //
    // aplicación de nuestra Aplicación, viene establecido con una serie    //
    // de bloques.                                                          //
    //  --> Declaración de Módulos                                          //
    //  --> Declaración de Rutas                                            //
    //  --> Declaraciones Extra                                             //
    //  --> Gestión de la Aplicación                                        //
    //      -*-> Configuración de la App                                    //
    //      -*-> Ejecución de Middlewares                                   //
    // (Un middleware es una función que se puede ejecutar antes o después  // 
    // del manejo de una ruta.)                                             //
    //----------------------------------------------------------------------//

// ********************************************************************* //
//   Declaración de los módulos que vamos a utilizar en la Aplicación.   //
// ********************************************************************* //

var express      = require('express'),
    favicon      = require('serve-favicon'),
    bodyParser   = require('body-parser'),
    pug          = require('pug'),
    morgan       = require('morgan'),
    restFul      = require('express-method-override')('_method'),
    session      = require('express-session'),
    cookieParser = require("cookieparser"),

    

// ********************************************************************* //
//    Declaración de las rutas que vamos a utilizar en la Aplicación.    //
// ********************************************************************* //

    routes       = require('./routes/router'),
    faviconURL = __dirname + '/public/img/icono.png',            // Ruta de nuestro Favicon
    publicDir  = express.static(__dirname + '/public'),         // Ruta de los ficheros Estáticos
    viewDir    = __dirname + '/views',                          // Ruta de las vistas

// ********************************************************************* //
//                          Declaraciones Extras                         //
// ********************************************************************* //

    // En el core de Node.js, process, en este caso process.env. Hace referencia a las variables de entorno del sistema.
    // En este caso queremos la referencia del PUERTO, si hay error haciendo la referencia, tendrá el valor de Puerto 3000.

        port       = (process.env.PORT || 3000)  
        
    // Variable que usaremos para usar nuestro Framework Express en la Aplicación.

        app        = express()

// ********************************************************************* //
//                         Gestión la Aplicación.                        //
// ********************************************************************* //


app
    // --> Configuración de la app

    .set('views', viewDir)          // Establecemos las views de nuestra Aplicación.
    .set('view engine', 'pug')      // Establecemos el motor de plantillas de nuestra Aplicación, usaremos Pug.js
    .set('port', port)              // Establecemos el puero de nuestra Aplicación.
    
    // --> Ejecución Middlewares 

    .use(favicon(faviconURL))                       // Nos sirve para establecer el Favicon.
    .use(bodyParser.json())                         // Permite manipular el fichero application/json
    .use(bodyParser.urlencoded({extended : false})) // Toda la información del formulario se parsean con application/x-www-form-urlencoded
    .use(restFul)                                   // Que nos ejecuta las características de la API REST
    .use(morgan('dev'))                             // Nos establecen los logs de la Aplicación
    .use(publicDir)                                 // Nos establece la ruta de nuestros ficheros estáticos / públicos
    .use(routes)                                    // Nos gestiona nuestro Enrutador de la Aplicación.
    
// ********************************************************************* //
//                         Exportación del Módulo.                       //
// ********************************************************************* //

module.exports = app