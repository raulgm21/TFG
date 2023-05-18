window.onload = () => {

    document.getElementById("HOME_flechita").addEventListener("click", cambiar_menu);
    document.getElementById("HOME_nombre").addEventListener("click", cambiar_menu);

    function cambiar_menu() 
    {
        var menu = document.getElementById("HOME_menu_flechita");

        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    }

    // SALTAR TUTORIAL
    if(document.getElementById("HOME_tutorial_no")){

        document.getElementById("HOME_tutorial_no").addEventListener("click", () => {
            
            var dni = document.getElementById("HOME_DNI_USUARIO").value;


            var modal = document.createElement("div");
                modal.style.height = "80px";
                modal.style.width = "40%";
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
            texto.innerHTML = "De acuerdo, si alguna vez necesitas realizar el tutorial. En <strong>Configuración</strong> estará siempre disponible cuando lo necesites.";
            texto.style.textAlign = "center";
            texto.style.fontFamily = "monospace";
            modal.appendChild(texto);

            var boton = document.createElement("button");
            boton.style.display = "block";
            boton.style.textAlign = "center";
            boton.style.margin = "0 auto";
            boton.style.border = "none";
            boton.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            boton.innerHTML = "Salir"
            modal.appendChild(boton);

            boton.addEventListener("click", () => {
                modal.remove();
            });

            DATOS = { dni : dni,}

            fetch('/tutorialNO', {
                method: 'PUT',
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

                var texto     = document.getElementById("HOME_cuerpo_texto_tutorial");
                var botonSI   = document.getElementById("HOME_tutorial_si");
                var asistente = document.getElementById("HOME_asistente_tutorial");
                var botonNO   = document.getElementById("HOME_tutorial_no");

                texto.style.display = "none";
                botonSI.style.display = "none";
                asistente.style.display = "none";
                botonNO.style.display = "none";
            })

            .catch(error => {
                console.error('Error al enviar los datos:' + error);
            });

        })
    }

 

    
}