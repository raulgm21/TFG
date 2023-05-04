//------------------------------------------------------------------------------------------------------------//
//        *******       **********      ********          **      **        **********        ********        //
//        ********      **********      ********          **      **        **********        ********        //
//      **              **              **      **        **      **        **                **      **      //
//      **              **              **      **        **      **        **                **      **      //
//        ******        ********        **      **        **      **        ********          **      **      //
//        ******        ********        **      **        **      **        ********          **      **      //
//              **      **              ********            **  **          **                ********        //
//              **      **              ********            **  **          **                ********        //
//      ********        **********      **      **            **            **********        **      **      //
//      ********        **********      **      **            **            **********        **      **      //
//------------------------------------------------------------------------------------------------------------//   

    //----------------------------------------------------------------------//
    // El fichero server.js es quien nos establece la conexión a Internet,  //
    // mediante la ayuda del fichero app.js, que es quien nos gestiona la   //
    // aplicación.                                                          //
    //                                                                      //
    // Mediante el comando: npm start                                       //
    // Nos iniciará el Servidor si todo está correcto                       //
    // de bloques.                                                          //
    //----------------------------------------------------------------------//
    
    // Creamos una variable para disponer del MÓDULO que hemos exportado en el fichero app.js

    var app    = require('./app.js'),
        
    // El funcionamiento de la variable 'server' es la siguiente:
    // --> Mediante app.listen, le diremos que escuche el Puerto que usaremos para la conexión a Internet.
    // --> Mediante app.get('port'), recogerá el valor que haya recogido en: app.set('port', port)

        server = app.listen(app.get('port'), () => {
            console.log(`Iniciando Proyecto TFG desde el puerto ${app.get('port')}`)
        })

       