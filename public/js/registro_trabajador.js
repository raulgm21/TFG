window.onload = () => {

    document.getElementById("REGISTRO_TRABAJADOR_BOTON").addEventListener("click", () => {window.location.href = '/registro'});
    
    document.getElementById("input_trabajador_submit").addEventListener("click", () => {
        
        // --- VARIABLES ---
        var identificador          = document.getElementById("input_trabajador_nombre").value;
        var password               = document.getElementById("input_trabajador_password").value;

        var label_identificador    = document.getElementById("REGISTRO_trabajador_identificador_label");
        var label_password         = document.getElementById("REGISTRO_trabajador_password_label");

       // ---------------------------------------------------------------------------------------------------- //

        if(identificador.length > 0){
           // Correcto
           label_identificador.style.background = "green";
           label_identificador.style.color = "white";
           label_identificador.style.fontWeight = "bold";
       }else{
           // Error
           label_identificador.style.background = "red";
           label_identificador.style.color = "white";
           label_identificador.style.fontWeight = "bold";
       }

       if(password.length >= 8){
            // Correcto
            label_password.style.background = "green";
            label_password.style.color = "white";
            label_password.style.fontWeight = "bold";
        }else{
            // Error
            label_password.style.background = "red";
            label_password.style.color = "white";
            label_password.style.fontWeight = "bold";
        }

       if(identificador.length > 0 && password >= 8 ){

           DATOS = {
               identificador : identificador,
               password      : password,
           }

           fetch('/consultar/trabajador/identificador', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(DATOS)
           })

           .then(response => {
   
               if (response.ok){return response.text();}
               else{console.log("Error");}
                 
           })

           .then(textoRespuesta => {
   
               if(textoRespuesta === 'Correcto') { 
                    var modal = document.createElement("div");
                    modal.style.height = "380px";
                    modal.style.width = "45%";
                    modal.style.border = "none";
                    modal.style.position = "fixed";
                    modal.style.top = "50%";
                    modal.style.left = "50%";
                    modal.style.transform = "translate(-50%, -50%)";
                    modal.style.backgroundColor = "#fff";
                    modal.style.zIndex = "1000";
                    modal.style.padding = "20px";
                    modal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

                    var BODY = document.body;
                    BODY.appendChild(modal);

                    var texto = document.createElement("p");
                    texto.innerHTML = "¡Hola!, él responsable de su empresa le asignó el identificador " + identificador +". A continuación, rellene sus datos para poder acceder así al espacio privado de su empresa.";
                    texto.style.textAlign = "center";
                    texto.style.fontFamily = "monospace";
                    modal.appendChild(texto);

                    var formulario = document.createElement("form");
                    formulario.setAttribute("id","FORMULARIO_REGISTRO_TRABAJADOR_FINAL");
                    modal.appendChild(formulario);

                    var input_nombre = document.createElement("input");
                    input_nombre.setAttribute("type", "text");
                    input_nombre.setAttribute("id","INPUT_TRABAJADOR_NOMBRE");
                    input_nombre.setAttribute("placeholder", "Inserte su nombre: min 3 caract.");
                    formulario.appendChild(input_nombre);

                    var input_dni = document.createElement("input");
                    input_dni.setAttribute("type", "text");
                    input_dni.setAttribute("id","INPUT_TRABAJADOR_DNI");
                    input_dni.setAttribute("placeholder", "Inserte su DNI: 00000000X");
                    formulario.appendChild(input_dni);

                    var input_correo = document.createElement("input");
                    input_correo.setAttribute("type", "text");
                    input_correo.setAttribute("id","INPUT_TRABAJADOR_CORREO");
                    input_correo.setAttribute("placeholder", "Inserte su correo: xxx@gmail.com");
                    formulario.appendChild(input_correo);

                    var input_password = document.createElement("input");
                    input_password.setAttribute("type", "password");
                    input_password.setAttribute("placeholder", "Inserte su contraseña: min 8 caract.");
                    input_password.setAttribute("id","INPUT_TRABAJADOR_PASSWORD");
                    formulario.appendChild(input_password);

                    var input_submit = document.createElement("input");
                    input_submit.value = "Enviar";
                    input_submit.setAttribute("type", "button");
                    input_submit.style.cursor = "pointer";
                    input_submit.style.position = "relative";
                    input_submit.style.top = "16px";
                    formulario.appendChild(input_submit);

                    // ENVIAR
                    input_submit.addEventListener("click", () => {

                        var NOMBRE      = input_nombre.value;
                        var CORREO      = input_correo.value;
                        var PASSWORD    = input_password.value;
                        var DNI         = input_dni.value;
                        registrar_trabajador(NOMBRE, CORREO, PASSWORD, DNI, identificador);
                    })


               }

               if(textoRespuesta === 'Error') { 
                    label_identificador.style.background = "red";
                    label_identificador.style.color = "white";
                    label_identificador.style.fontWeight = "bold";
                }
                 
            })

           .catch(error => {
           console.error('Error al enviar los datos:' + error);
           });


       }

   })

   function registrar_trabajador(NOMBRE, CORREO, PASSWORD, DNI, identificador){
    
        // Input
        var input_NOMBRE    = document.getElementById("INPUT_TRABAJADOR_NOMBRE");
        var input_CORREO    = document.getElementById("INPUT_TRABAJADOR_CORREO");
        var input_DNI       = document.getElementById("INPUT_TRABAJADOR_DNI");
        var input_PASSWORD  = document.getElementById("INPUT_TRABAJADOR_PASSWORD");

        // Expresión Regular -> Solo letras
        var solo_letras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;

        // ------------------------------------------------------ //
        //                        FUNCIONES
        // ------------------------------------------------------ //

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

        // ------------------------- VALIDAR ----------------------- //
        
        // -> Correo
        if(validarGmail(CORREO) && CORREO.length > 12){
            // Correcto
            input_CORREO.style.color = "green";
            input_CORREO.style.fontWeight = "bold";
        }else{
            // Error
            input_CORREO.style.color = "red";
            input_CORREO.style.fontWeight = "bold";
        }

        // -> Nombre
        if(NOMBRE.length >= 3 && solo_letras.test(NOMBRE)){
            input_NOMBRE.style.color = "green";
            input_NOMBRE.style.fontWeight = "bold";
        }else{
            input_NOMBRE.style.color = "red";
            input_NOMBRE.style.fontWeight = "bold";
        }

        // -> Contraseña
        if(PASSWORD.length >= 8){
            input_PASSWORD.style.color = "green";
            input_PASSWORD.style.fontWeight = "bold";
        }else{
            input_PASSWORD.style.color = "red";
            input_PASSWORD.style.fontWeight = "bold";
        }

        // -> DNI
        if(validarDNI(DNI)){
            input_DNI.style.color = "green";
            input_DNI.style.fontWeight = "bold";
        }else{
            input_DNI.style.color = "red";
            input_DNI.style.fontWeight = "bold";
        }

        if
        (
            validarGmail(CORREO) && CORREO.length > 12 && NOMBRE.length >= 3 && 
            solo_letras.test(NOMBRE)  && PASSWORD.length >= 8 && validarDNI(DNI)
        )
        {
            
            DATOS = {
                nombre        : NOMBRE,
                correo        : CORREO,
                password      : PASSWORD,
                dni           : DNI,
                identificador : identificador
            }

            fetch('/registro/trabajador/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(DATOS)
            })

            .then(response => {
    
                if (response.ok){return response.text();}
                else{console.log("Error");}
                  
            })

            .then(textoRespuesta => {
    
                if (textoRespuesta === 'Correcto') { window.location.href = '/'; }
                if (textoRespuesta != "Correcto")  { 

                    if(document.getElementById("REGISTRO_TRABAJADOR_ERROR")){
                        CUERPO.removeChild(CUERPO.lastChild)
                    }
                    
                    if(!document.getElementById("REGISTRO_TRABAJADOR_ERROR")){
                        var texto = document.createElement("p");
                        texto.innerHTML = "Algunos de los campos no son correctos";
                        texto.setAttribute("id","REGISTRO_TRABAJADOR_ERROR");
                        CUERPO.appendChild(texto);
                    }
                }
                  
              })

            .catch(error => {
            console.error('Error al enviar los datos:' + error);
            });



        }
        else{

            if(document.getElementById("REGISTRO_TRABAJADOR_ERROR")){
                CUERPO.removeChild(CUERPO.lastChild)
            }
            
            if(!document.getElementById("REGISTRO_TRABAJADOR_ERROR")){
                var texto = document.createElement("p");
                texto.innerHTML = "Algunos de los campos no son correctos";
                texto.setAttribute("id","REGISTRO_TRABAJADOR_ERROR");
                CUERPO.appendChild(texto);
            }
        }


   }

}