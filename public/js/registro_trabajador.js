window.onload = () => {

    document.getElementById("REGISTRO_TRABAJADOR_BOTON").addEventListener("click", () => {window.location.href = '/registro'});
    
    document.getElementById("input_trabajador_submit").addEventListener("click", () => {
        
        // --- VARIABLES ---
        var identificador          = document.getElementById("input_trabajador_nombre").value;
        var password            = document.getElementById("input_trabajador_password").value;

       // ---------------------------------------------------------------------------------------------------- //

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
                    modal.style.height = "80px";
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

                    // nombre, correo, contraseña y DNI

                    var formulario = document.createElement("form");
                    modal.appendChild(formulario);

                    var input_nombre = document.createElement("input");
                    input_nombre.setAttribute("type", "text");
                    input_nombre.setAttribute("placeholder", "NOMBRE");
                    formulario.appendChild(input_nombre);

                    var input_dni = document.createElement("input");
                    input_dni.setAttribute("type", "text");
                    input_dni.setAttribute("placeholder", "DNI");
                    formulario.appendChild(input_dni);

                    var input_correo = document.createElement("input");
                    input_correo.setAttribute("type", "text");
                    input_correo.setAttribute("placeholder", "CORREO");
                    formulario.appendChild(input_correo);

                    var input_password = document.createElement("input");
                    input_password.setAttribute("type", "password");
                    input_password.setAttribute("placeholder", "password");
                    formulario.appendChild(input_password);

                    var input_submit = document.createElement("input");
                    input_submit.value = "Enviar";
                    input_submit.setAttribute("type", "button");
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
                alert("erroe");
                }
                 
            })

           .catch(error => {
           console.error('Error al enviar los datos:' + error);
           });


       }

   })

   function registrar_trabajador(NOMBRE, CORREO, PASSWORD, DNI, identificador){
    
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

        // validar bonito


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
                if (textoRespuesta != "Correcto")  { alert("Error al insertar"); }
                  
              })

            .catch(error => {
            console.error('Error al enviar los datos:' + error);
            });



        }
        else{
            alert("error");
        }


   }

}