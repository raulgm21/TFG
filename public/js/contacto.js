window.onload = () => {

    document.getElementById("submit_contacto").addEventListener("click", () => {
        
        let correo                  = document.getElementById("correo_contacto").value;
        let asunto                  = document.getElementById("asunto_contacto").value;
        let descripcion             = document.getElementById("descripcion_contacto").value;
          
        let input_correo            = document.getElementById("correo_contacto");
        let input_descripcion       = document.getElementById("descripcion_contacto");
          
        // ENVIAR CORREO
        DATOS = {
            correo        : correo,
            asunto        : asunto,
            descripcion   : descripcion,
        }

        fetch('/contacto/correo', {
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

            var respuesta = document.getElementById("RESPUESTA_CORREO");
            respuesta.style.position = "relative";
            respuesta.style.top = "480px";

            if (textoRespuesta === 'Correcto') {
                respuesta.innerHTML = "Correo envíado correctamente.";
                respuesta.style.background = "green";

                input_correo.value = "";
                input_descripcion.value = "";

            }else{ 
                respuesta.innerHTML = "Ese correo no existe o has dejado algún campo vacío.";
                respuesta.style.background = "red";
            }
                
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });

    })

    document.getElementById("correo_contacto").addEventListener("change", vaciar);
    document.getElementById("asunto_contacto").addEventListener("change", vaciar);
    document.getElementById("descripcion_contacto").addEventListener("change", vaciar);
    
    function vaciar(){
        var respuesta = document.getElementById("RESPUESTA_CORREO");
        respuesta.innerHTML = "";
    }

}