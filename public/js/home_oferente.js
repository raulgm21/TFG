window.onload = () => {

    // ------------------------------- VARIABLES ------------------------------- //
    const CUERPO    = document.getElementById("HOME_cuerpo");
    const DNI       = document.getElementById("HOME_DNI_USUARIO").value;
    const NOMBRE    = document.getElementById("HOME_nombre").textContent;
    const DATE      = document.getElementById("HOME_DATE_USUARIO").value;
    const CORREO    = document.getElementById("HOME_CORREO_USUARIO").value;
    const COLOR     = document.getElementById("HOME_COLOR_USUARIO").value;

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

    document.getElementById("HOME_INICIO").addEventListener("click", () => { pantalla_inicio() })

    function pantalla_inicio(){

        vaciar_cuerpo(CUERPO);
        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Le damos la bienvenida a TeanWork !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Desde Teamwork, esperamos que vaya bien la instancia " + NOMBRE;
        CUERPO.appendChild(texto);

        var texto2 = document.createElement("p");
        texto2.setAttribute("id","HOME_cuerpo_texto_no_nombre");
        texto2.innerHTML = "";
        CUERPO.appendChild(texto2);

        var imagen = document.createElement("img");
        imagen.setAttribute("id","HOME_cuerpo_imagen_empresa");
        imagen.setAttribute("src", "./img/logo.png");
        CUERPO.appendChild(imagen);

    }

// ----------------------------------------------------------------------------------------------- // 

    // ---------------------------------------------------------------------- //
    // Sección de Búsqueda
    // ---------------------------------------------------------------------- //
    
    document.getElementById("HOME_BUSQUEDA").addEventListener("click", () => {

        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Empresas de TeamWork !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "¡Aquí se le ofrece un listado de todas las empresas que desean poder colaborar con usted!";
        CUERPO.appendChild(texto);

        fetch('/mostrar-empresas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        .then(response => {

            if (response.ok){return response.json();}
            else{console.log("Error");}
            
        })

        .then(textoRespuesta => {

            var tabla = document.createElement("table");
            tabla.setAttribute("id","HOME_PERSONAL_EMPRESARIO");
            CUERPO.appendChild(tabla);

            var fila = document.createElement("tr");
            tabla.appendChild(fila);

            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Imagen de la Empresa";
            fila.appendChild(columna);

            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Nombre de la Empresa";
            fila.appendChild(columna);

            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Empresario de la Empresa";
            fila.appendChild(columna);

            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Correo del Empresario";
            fila.appendChild(columna);

            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "";
            fila.appendChild(columna);


            for(i = 0 ; i < textoRespuesta.length ; i++){
                if(textoRespuesta[i].imagen_empresa != undefined){

                    var fila = document.createElement("tr");
                    tabla.appendChild(fila);

                    var foto = document.createElement("img");
                    foto.setAttribute("src",textoRespuesta[i].imagen_empresa);
                    foto.style.height = "64px";
                    foto.style.width = "216px";
                    foto.style.position = "relative";
                    foto.style.left = "16px";
                    fila.appendChild(foto);

                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].nombre_empresa;
                    fila.appendChild(columna);

                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].nombre;
                    fila.appendChild(columna);

                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].correo;
                    fila.appendChild(columna);

                    var columna = document.createElement("img");
                    columna.setAttribute("id","CORREO_MENSAJE");
                    columna.setAttribute("class", textoRespuesta[i].correo);
                    columna.style.height = "32px";
                    columna.style.width = "32px";
                    columna.style.position = "relative";
                    columna.style.top = "-12px";
                    columna.style.left = "92px";
                    columna.style.cursor = "pointer";
                    columna.setAttribute("src", "./img/icon/chat.png");
                    fila.appendChild(columna);
                }
            }

            // obtener el valor para luego hacer el modal
            var boton = document.querySelectorAll("img#CORREO_MENSAJE");

            for (boton_seleccionado of boton) {

                boton_seleccionado.addEventListener("click", (e) => {

                    var hijo = e.target;
                    var VALOR = hijo.getAttribute("class");
                    escribir_correo(VALOR);

                });
            }

        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });

    })

    // ---------------------------------------------------------------------- //
    // ESCRIBIR CORREO
    // ---------------------------------------------------------------------- //
    
    function escribir_correo(CORREO_QUIEN_RECIBE){

        var CORREO_QUIEN_ENVIA = CORREO;

        var modal = document.createElement("div");
        modal.style.height = "240px";
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
        texto.innerHTML = `De acuerdo vas a mandar un correo al empresaio <strong>${CORREO_QUIEN_RECIBE}</strong>. Escriba el mensaje que desees que reciba.`;
        texto.style.textAlign = "center";
        texto.style.fontFamily = "monospace";
        modal.appendChild(texto);

        var textarea = document.createElement("textarea");
        textarea.setAttribute("id","CORREO_TEXTAREA");
        modal.appendChild(textarea);


        var enviar = document.createElement("button");
        enviar.style.display = "block";
        enviar.style.textAlign = "center";
        enviar.style.margin = "0 auto";
        enviar.style.border = "none";
        enviar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        enviar.innerHTML = "Enviar"
        enviar.style.position = "relative";
        enviar.style.top = "8px";
        modal.appendChild(enviar);

        // ---- ENVIAR ---- //
        enviar.addEventListener("click", () => {
            

            DATOS = { 
                envia   : CORREO_QUIEN_ENVIA,
                recibe  : CORREO_QUIEN_RECIBE,
                mensaje : textarea.value,
                estado  : "OFERENTE"
            }

            
        
            fetch('/mandar-correo', {
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

                modal.remove();
                pantalla_correo();
            })

            .catch(error => {
                console.error('Error al enviar los datos:' + error);
            });


           
        });

        var salir = document.createElement("button");
        salir.style.display = "block";
        salir.style.textAlign = "center";
        salir.style.margin = "0 auto";
        salir.style.border = "none";
        salir.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        salir.innerHTML = "Atrás"
        salir.style.position = "relative";
        salir.style.top = "16px";
        modal.appendChild(salir);

        salir.addEventListener("click", () => {
            modal.remove();
        });

    }
}