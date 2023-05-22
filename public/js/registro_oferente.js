window.onload = () => {

    document.getElementById("REGISTRO_OFERENTE_BOTON").addEventListener("click", () => {window.location.href = '/registro'});
    
    document.getElementById("input_oferente_submit"),addEventListener("click", () => {

         // --- VARIABLES ---
         var nombre          = document.getElementById("input_oferente_nombre").value;
         var correo          = document.getElementById("input_oferente_correo").value;
         var dni             = document.getElementById("input_oferente_dni").value;
         var password        = document.getElementById("input_oferente_password").value;
         var actividad       = document.getElementById("REGISTRO_oferente_select").value;

         // --- LABELS ---
        var label_nombre          = document.getElementById("REGISTRO_oferente_nombre_label");
        var label_correo          = document.getElementById("REGISTRO_oferente_correo_label");
        var label_dni             = document.getElementById("REGISTRO_oferente_dni_label");
        var label_password        = document.getElementById("REGISTRO_oferente_password_label");
        var label_actividad       = document.getElementById("REGISTRO_oferente_select_label");

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

        // -> Correo
        if(validarGmail(correo) && correo.length > 12){
            // Correcto
            label_correo.style.background = "green";
            label_correo.style.color = "white";
            label_correo.style.fontWeight = "bold";
        }else{
            // Error
            label_correo.style.background = "red";
            label_correo.style.color = "white";
            label_correo.style.fontWeight = "bold";
        }

        // -> Nombre
        if(nombre.length >= 3 && solo_letras.test(nombre)){
            label_nombre.style.background = "green";
            label_nombre.style.color = "white";
            label_nombre.style.fontWeight = "bold";
        }else{
            label_nombre.style.background = "red";
            label_nombre.style.color = "white";
            label_nombre.style.fontWeight = "bold";
        }

        // -> Contraseña
        if(password.length >= 8){
            label_password.style.background = "green";
            label_password.style.color = "white";
            label_password.style.fontWeight = "bold";
        }else{
            label_password.style.background = "red";
            label_password.style.color = "white";
            label_password.style.fontWeight = "bold";
        }

        // -> DNI
        if(validarDNI(dni)){
            label_dni.style.background = "green";
            label_dni.style.color = "white";
            label_dni.style.fontWeight = "bold";
        }else{
            label_dni.style.background = "red";
            label_dni.style.color = "white";
            label_dni.style.fontWeight = "bold";
        }

        // -> Actividad
        if(actividad != "Seleccione una categoría"){
            label_actividad.style.background = "green";
            label_actividad.style.color = "white";
            label_actividad.style.fontWeight = "bold";
        }else{
            label_actividad.style.background = "red";
            label_actividad.style.color = "white";
            label_actividad.style.fontWeight = "bold";
        }

        // ---------------------------------------------------------------------------------------------------- //

        if
        (
            validarGmail(correo) && correo.length > 12 && nombre.length >= 3 && solo_letras.test(nombre) && password.length >= 8 
            && validarDNI(dni) && actividad != "Seleccione una categoría"
        )
        {
            DATOS = {
                nombre        : nombre,
                correo        : correo,
                password      : password,
                dni           : dni,
                actividad     : actividad
            }

            fetch('/registro/oferente/submit', {
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
                  
              })

            .catch(error => {
            console.error('Error al enviar los datos:' + error);
            });


        }

    })
}