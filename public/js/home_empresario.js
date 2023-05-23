window.onload = () => {

    const CUERPO    = document.getElementById("HOME_cuerpo");
    const DNI       = document.getElementById("HOME_DNI_USUARIO").value;
    const EMPRESA   = document.getElementById("HOME_nombre_empresa").textContent;
    const NOMBRE    = document.getElementById("HOME_nombre").textContent;
    const ID        = DNI+"-"+EMPRESA;
    
    // --------------------------- Color Personalizado --------------------------- //
    const COLOR     = document.getElementById("HOME_COLOR_USUARIO").value;
    const HEADER    = document.getElementById("HOME_HEADER");
    const TextoNO   = document.getElementById("HOME_cuerpo_texto_no_nombre");
    const MENU      = document.getElementById("HOME_MENU");

    HEADER.style.backgroundColor    = COLOR;
    CUERPO.style.boxShadow          = "0 6px 10px " + COLOR;
    TextoNO.style.color             = COLOR;
    MENU.style.backgroundColor      = COLOR;

    function vaciar_cuerpo(padre){
        while(padre.firstChild){ 
            padre.removeChild(padre.firstChild); 
        }  
    }

    document.getElementById("HOME_flechita").addEventListener("click", cambiar_menu);
    document.getElementById("HOME_nombre").addEventListener("click", cambiar_menu);


    // Mostrar y Ocultar Menú
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

    // Cerrar Sesión
    document.getElementById("HOME_cerrar_sesion").addEventListener("click", () => { window.location.href = "/iniciarSesion"; } )

    // INICIO
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

    // Foto Perfil
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

    // LISTADO
    document.getElementById("HOME_PERSONAL").addEventListener("click", () => {
        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "Hola, le damos la bienvenida a la gestión de su Personal";
        CUERPO.appendChild(titulo);

        var contenedor_principal = document.createElement("div");
        contenedor_principal.setAttribute("id","HOME_DIV_PRINCIPAL_PERSONAL")
        CUERPO.appendChild(contenedor_principal);

        var contenedor = document.createElement("div");
        contenedor_principal.appendChild(contenedor);

        var PERSONAL_AÑADIR = document.createElement("img");
        PERSONAL_AÑADIR.setAttribute("id", "PERSONAL_AÑADIR");
        PERSONAL_AÑADIR.setAttribute("class","PERSONAL_CRUD");
        PERSONAL_AÑADIR.setAttribute("src", "./img/personal_añadir.png");
        contenedor.appendChild(PERSONAL_AÑADIR);

        var texto_añadir = document.createElement("p");
        texto_añadir.innerHTML = "Introducir Empleado";
        contenedor.appendChild(texto_añadir);

        var contenedor = document.createElement("div");
        contenedor_principal.appendChild(contenedor);

        var PERSONAL_ELIMINAR = document.createElement("img");
        PERSONAL_ELIMINAR.setAttribute("id", "PERSONAL_ELIMINAR");
        PERSONAL_ELIMINAR.setAttribute("class","PERSONAL_CRUD");
        PERSONAL_ELIMINAR.setAttribute("src", "./img/personal_eliminar.png");
        contenedor.appendChild(PERSONAL_ELIMINAR);

        var texto_eliminar = document.createElement("p");
        texto_eliminar.innerHTML = "Eliminar Empleado";
        contenedor.appendChild(texto_eliminar);

        var contenedor = document.createElement("div");
        contenedor_principal.appendChild(contenedor);

        var PERSONAL_CONSULTAR = document.createElement("img");
        PERSONAL_CONSULTAR.setAttribute("id", "PERSONAL_CONSULTAR");
        PERSONAL_CONSULTAR.setAttribute("class","PERSONAL_CRUD");
        PERSONAL_CONSULTAR.setAttribute("src", "./img/personal_consultar.png");
        contenedor.appendChild(PERSONAL_CONSULTAR);

        var texto_consultar = document.createElement("p");
        texto_consultar.innerHTML = "Consultar Empleados";
        contenedor.appendChild(texto_consultar);

        // AÑADIR

        PERSONAL_AÑADIR.addEventListener("click", () => { añadir_personal(); })

        // ELIMINAR

        PERSONAL_ELIMINAR.addEventListener("click", () => {
            alert("ELIMINAR");
        })

        // CONSULTAR

        PERSONAL_CONSULTAR.addEventListener("click", () => { mostrar_personal(); })



    })

    // Interfaz
    function añadir_personal(){
        
        vaciar_cuerpo(CUERPO);

        var TITULO = document.createElement("h1");
        TITULO.setAttribute("id","HOME_cuerpo_titulo");
        TITULO.innerHTML = "¡ Estas apunto de añadir un empleado nuevo en " + EMPRESA + " !";
        CUERPO.appendChild(TITULO);

        var TEXTO = document.createElement("p");
        TEXTO.setAttribute("id","HOME_cuerpo_texto_nombre");
        TEXTO.innerHTML = "Rellene este simple fomulario."
        CUERPO.appendChild(TEXTO);
        
        var FORMULARIO = document.createElement("form");
        CUERPO.appendChild(FORMULARIO);

        var INPUT_NOMBRE_ID = document.createElement("input");
        INPUT_NOMBRE_ID.setAttribute("id","NUEVO_PERSONAL_ID");
        INPUT_NOMBRE_ID.setAttribute("type","text");
        FORMULARIO.appendChild(INPUT_NOMBRE_ID);

        var INPUT_PASSWORD = document.createElement("input");
        INPUT_PASSWORD.setAttribute("id","NUEVO_PERSONAL_PASSWORD");
        INPUT_PASSWORD.setAttribute("type","password");
        FORMULARIO.appendChild(INPUT_PASSWORD);

        var INPUT_CARGO = document.createElement("input");
        INPUT_CARGO.setAttribute("id","NUEVO_PERSONAL_CARGO");
        INPUT_CARGO.setAttribute("type","text");
        FORMULARIO.appendChild(INPUT_CARGO);

        var INPUT_SUBMIT = document.createElement("input");
        INPUT_SUBMIT.setAttribute("id","NUEVO_PERSONAL_SUBMIT");
        INPUT_SUBMIT.setAttribute("type","button");
        INPUT_SUBMIT.value = "Añadir"
        FORMULARIO.appendChild(INPUT_SUBMIT);

        document.getElementById("NUEVO_PERSONAL_SUBMIT").addEventListener("click", () => { añadir_personal_submit(); })

    }

    // Submit
    function añadir_personal_submit(){

        var IDENTIFICADOR = document.getElementById("NUEVO_PERSONAL_ID").value;
        var PASSWORD      = document.getElementById("NUEVO_PERSONAL_PASSWORD").value;
        var CARGO         = document.getElementById("NUEVO_PERSONAL_CARGO").value;

        alert("ID " + IDENTIFICADOR + " PASS " + PASSWORD +  "CARGO " + CARGO);
        
        DATOS = { 
            id_empresa : ID,
            nombre_empresa : EMPRESA, 
            identificador : IDENTIFICADOR,
            password : PASSWORD,
            cargo : CARGO,
            color : COLOR,

        }
        if(IDENTIFICADOR.length > 0 && PASSWORD.length >= 8 && CARGO.length > 0){

            fetch('/insertar-personal', {
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
                if(textoRespuesta == "Correcto"){
                    alert("Introducido");
                }
                if(textoRespuesta == "Existe el Identificador"){
                    alert("Ese Identificador esta ocupado");
                }
                
            })

            .catch(error => {
                console.error('Error al enviar los datos:' + error);
            });
        
        }else{
            alert("No puedes dejar un campo vacío");
        }
    }

    // Mostrar personal
    function mostrar_personal(){

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

    }
    
    

}