window.onload = () => {

    // ------------------------------- VARIABLES ------------------------------- //
    const CUERPO    = document.getElementById("HOME_cuerpo");
    const DNI       = document.getElementById("HOME_DNI_USUARIO").value;
    const EMPRESA   = document.getElementById("HOME_nombre_empresa").textContent;
    const NOMBRE    = document.getElementById("HOME_nombre").textContent;
    const ID        = document.getElementById("HOME_ID_EMPRESA").value;

    // --------------------------- Color Personalizado --------------------------- //
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
    // Sección de código que nos carga la sección de INICIO
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_INICIO").addEventListener("click", () => {
        vaciar_cuerpo(CUERPO);
        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Le damos la bienvenida a " + EMPRESA + " !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Desde Teamwork, esperamos que vaya bien la instancia " + NOMBRE;
        CUERPO.appendChild(texto);

        var texto2 = document.createElement("p");
        texto2.setAttribute("id","HOME_cuerpo_texto_no_nombre");
        texto2.innerHTML = "¿No eres " + NOMBRE + "?"
        CUERPO.appendChild(texto2);

        var imagen = document.createElement("img");
        imagen.setAttribute("id","HOME_cuerpo_imagen_empresa");
        imagen.setAttribute("src", "./img/empresa1.png");
        CUERPO.appendChild(imagen);


    })

// ----------------------------------------------------------------------------------------------- // 

    // ---------------------------------------------------------------------- //
    // Sección de código que nos muestra a todos los trabajadores de la empresa.
    // ---------------------------------------------------------------------- //
    
    document.getElementById("HOME_PERSONAL").addEventListener("click", () => {

        DATOS = { id_empresa : ID, }

        fetch('/mostrar-personal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(DATOS)
        })

        .then(response => {

            if (response.ok){return response.json();}
            else{console.log("Error");}
                
        })

        .then(textoRespuesta => {
          
            vaciar_cuerpo(CUERPO);

            var titulo = document.createElement("h1");
            titulo.setAttribute("id", "HOME_cuerpo_titulo");
            titulo.innerHTML = "Hola, le damos la bienvenida a su Personal";
            CUERPO.appendChild(titulo);

            var tabla = document.createElement("table");
            tabla.setAttribute("id","HOME_PERSONAL_EMPRESARIO");
            CUERPO.appendChild(tabla);

            var fila = document.createElement("tr");
            tabla.appendChild(fila);

            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "DNI";
            fila.appendChild(columna);
            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Nombre";
            fila.appendChild(columna);
            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Correo";
            fila.appendChild(columna);
            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Cargo";
            fila.appendChild(columna);
            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Foto";
            fila.appendChild(columna);


            // DNI, Nombre, Correo, Cargo, Foto

            for(i = 0 ; i < textoRespuesta.length ; i++){

                var fila = document.createElement("tr");
                tabla.appendChild(fila);

                var columna = document.createElement("td");
                columna.innerHTML = textoRespuesta[i].dni;
                fila.appendChild(columna);
                var columna = document.createElement("td");
                columna.innerHTML = textoRespuesta[i].nombre;
                fila.appendChild(columna);
                var columna = document.createElement("td");
                columna.innerHTML = textoRespuesta[i].correo;
                fila.appendChild(columna);
                var columna = document.createElement("td");
                columna.innerHTML = textoRespuesta[i].cargo;
                fila.appendChild(columna);
                var foto = document.createElement("img");
                foto.setAttribute("src",textoRespuesta[i].foto_perfil);
                foto.style.height = "64px";
                foto.style.width = "64px";
                foto.style.borderRadius = "9999px";
                foto.style.position = "relative";
                foto.style.left = "72px";
                fila.appendChild(foto);

                console.log(textoRespuesta[i])
            }
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });
    })

}