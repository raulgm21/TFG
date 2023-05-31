window.onload = () => {

    // ------------------------------- VARIABLES ------------------------------- //
    const CUERPO    = document.getElementById("HOME_cuerpo");
    const DNI       = document.getElementById("HOME_DNI_USUARIO").value;
    const NOMBRE    = document.getElementById("HOME_nombre").textContent;
    const DATE      = document.getElementById("HOME_DATE_USUARIO").value;
    const CORREO    = document.getElementById("HOME_CORREO_USUARIO").value;

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

            if (response.ok){return response.text();}
            else{console.log("Error");}
            
        })

        .then(textoRespuesta => {

            alert(textoRespuesta)
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });

    })

}