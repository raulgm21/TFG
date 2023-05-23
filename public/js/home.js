// ------------------------------- VARIABLES ------------------------------- //
    const CUERPO    = document.getElementById("HOME_cuerpo");
    const DNI       = document.getElementById("HOME_DNI_USUARIO").value;
    const EMPRESA   = document.getElementById("HOME_nombre_empresa").textContent;
    const NOMBRE    = document.getElementById("HOME_nombre").textContent;
    const ID        = document.getElementById("HOME_ID_EMPRESA").value;

    const COLOR     = document.getElementById("HOME_COLOR_USUARIO").value;
    const HEADER    = document.getElementById("HOME_HEADER");
    const TextoNO   = document.getElementById("HOME_cuerpo_texto_no_nombre");
    const MENU      = document.getElementById("HOME_MENU");

    HEADER.style.backgroundColor    = COLOR;
    CUERPO.style.boxShadow          = "0 6px 10px " + COLOR;
    TextoNO.style.color             = COLOR;
    MENU.style.backgroundColor      = COLOR;

    // Eliminar el contenedor principal
    function vaciar_cuerpo(padre){
        while(padre.firstChild){ 
            padre.removeChild(padre.firstChild); 
        }  
    }


// ----------------------------------------------------------------------------------------------- //
    
    // ---------------------------------------------------------------------- //
    // Sección de código que nos permite mostrar y ocultar el menú del header
    // ---------------------------------------------------------------------- //

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

// ----------------------------------------------------------------------------------------------- //
    
    // ---------------------------------------------------------------------- //
    // Sección de código que nos permite cerrar sesión.
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_cerrar_sesion").addEventListener("click", () => { window.location.href = "/iniciarSesion"; } )

// ----------------------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // Sección de código que nos permite SALTAR el Tutorial
    // ---------------------------------------------------------------------- //

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

// ----------------------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // Sección de código que nos permite cambiar nuestra foto de perfil
    // ---------------------------------------------------------------------- //
    
    document.getElementById("HOME_foto_perfil").addEventListener("click", () => {
        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Vas a cambiar tu foto de perfil !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("h1");
        texto.setAttribute("id", "HOME_cuerpo_texto_nombre");
        texto.innerHTML = "La imagen debe ser en un formato PNG y pesar menos de 1MB.";
        CUERPO.appendChild(texto);

        var texto = document.createElement("h1");
        texto.setAttribute("id", "HOME_cuerpo_texto_no_nombre");
        texto.innerHTML = "Ten en cuenta que cuando cambies tu foto de perfil, se te cerrará la sesión para así guardar los cambios.";
        CUERPO.appendChild(texto);

        var formulario = document.createElement("form");
        formulario.setAttribute("action", "/subir-foto");
        formulario.setAttribute("method", "POST");
        formulario.setAttribute("enctype","multipart/form-data")
        CUERPO.appendChild(formulario);

        var input_dni = document.createElement("input");
        input_dni.setAttribute("type","text");
        input_dni.setAttribute("name","dni");
        input_dni.setAttribute("value",DNI);
        input_dni.style.display = "none";
        formulario.appendChild(input_dni);

        var input_file = document.createElement("input");
        input_file.setAttribute("type","file");
        input_file.setAttribute("name","imagen");
        formulario.appendChild(input_file);

        var input_submit = document.createElement("input");
        input_submit.setAttribute("type", "submit");
        input_submit.setAttribute("value", "Enviar");
        formulario.appendChild(input_submit);

        var imagen = document.createElement("img");
        var fotoID = document.getElementById("HOME_foto_perfil");
        imagen.setAttribute("src", fotoID.src);
        imagen.style.height = "64px";
        imagen.style.width = "64px";
        imagen.style.borderRadius = "9999px";
        imagen.style.position = "relative";
        CUERPO.appendChild(imagen);

    })