window.onload = () => {

    //document.getElementById("REGISTRO_EMPRESARIO_BOTON").addEventListener("click", () => {window.location.href = '/registro'});
 
    document.getElementById("input_submit_sesion").addEventListener("click", (e) => {
        
        // --- VARIABLES ---
        var dni             = document.getElementById("input_dni_sesion").value;
        var password        = document.getElementById("input_password_sesion").value;
    
        // ---------------------------------------------------------------------------------------------------- //

        DATOS = {
            dni           : dni,
            password      : password,
        }

        fetch('/iniciarSesion/submit', {
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
    
            if (textoRespuesta === 'Correcto') {
                window.location.href = '/home';
            }
            if(textoRespuesta === 'Error'){
                alert("MAL");
            }
                  
            })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });

    })
}