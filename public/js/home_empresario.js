window.onload = () => {

    // ------------------------------- VARIABLES ------------------------------- //
    const CUERPO    = document.getElementById("HOME_cuerpo");
    const DNI       = document.getElementById("HOME_DNI_USUARIO").value;
    const EMPRESA   = document.getElementById("HOME_nombre_empresa").textContent;
    const NOMBRE    = document.getElementById("HOME_nombre").textContent;
    const ID        = document.getElementById("HOME_ID_EMPRESA").value;
    const DATE      = document.getElementById("HOME_DATE_USUARIO").value;
    const CORREO    = document.getElementById("HOME_CORREO_USUARIO").value;
    const CARGO     = document.getElementById("HOME_CARGO_USUARIO").value;
    const FOTO_EMP  = document.getElementById("HOME_cuerpo_imagen_empresa").src;
    const APARECE_OFERENTE = document.getElementById("HOME_OFERENTE_EMPRESA").value;

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
    
    document.getElementById("HOME_INICIO").addEventListener("click", () => { pantalla_inicio() })

    function pantalla_inicio(){

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
        texto2.innerHTML = "";
        CUERPO.appendChild(texto2);

        var imagen = document.createElement("img");
        imagen.setAttribute("id","HOME_cuerpo_imagen_empresa");
        imagen.setAttribute("src", FOTO_EMP);
        CUERPO.appendChild(imagen);

    }

// ----------------------------------------------------------------------------------------------- // 
   
    // ---------------------------------------------------------------------- //
    // Sección de código que nos carga las 3 opciones de listado del personal:
    // 1) Añadir    2) Eliminar     3) Consultar
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_PERSONAL").addEventListener("click", () => {
        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "Hola le damos la bienvenida a la gestión de su Personal";
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
        PERSONAL_ELIMINAR.addEventListener("click", () => { eliminar_personal(); })

        // CONSULTAR
        PERSONAL_CONSULTAR.addEventListener("click", () => { mostrar_personal(); })

    })

    // ---------------------------------------------------------------------- //
    // Sección de código que nos carga la interfaz para añadir un trabajador.
    // ---------------------------------------------------------------------- //
    
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
        FORMULARIO.setAttribute("id","NUEVO_PERSONAL_FORMULARIO")
        CUERPO.appendChild(FORMULARIO);

        var INPUT_NOMBRE_ID = document.createElement("input");
        INPUT_NOMBRE_ID.setAttribute("id","NUEVO_PERSONAL_ID");
        INPUT_NOMBRE_ID.setAttribute("placeholder", "Inserte un código identificador")
        INPUT_NOMBRE_ID.setAttribute("type","text");
        FORMULARIO.appendChild(INPUT_NOMBRE_ID);

        var INPUT_PASSWORD = document.createElement("input");
        INPUT_PASSWORD.setAttribute("id","NUEVO_PERSONAL_PASSWORD");
        INPUT_PASSWORD.setAttribute("type","password");
        INPUT_PASSWORD.setAttribute("placeholder", "Inserte una contraseña (min 8 caract.)")
        FORMULARIO.appendChild(INPUT_PASSWORD);

        var INPUT_CARGO = document.createElement("input");
        INPUT_CARGO.setAttribute("id","NUEVO_PERSONAL_CARGO");
        INPUT_CARGO.setAttribute("type","text");
        INPUT_CARGO.setAttribute("placeholder", "Inserte su cargo en la empresa")
        FORMULARIO.appendChild(INPUT_CARGO);

        var INPUT_SUBMIT = document.createElement("input");
        INPUT_SUBMIT.setAttribute("id","NUEVO_PERSONAL_SUBMIT");
        INPUT_SUBMIT.setAttribute("type","button");
        INPUT_SUBMIT.value = "Añadir"
        FORMULARIO.appendChild(INPUT_SUBMIT);

        document.getElementById("NUEVO_PERSONAL_SUBMIT").addEventListener("click", () => { añadir_personal_submit(); })

    }

    // ---------------------------------------------------------------------- //
    // Sección de código que nos añade a la base de datos el trabajador.
    // ---------------------------------------------------------------------- //
    
    function añadir_personal_submit(){

        var IDENTIFICADOR = document.getElementById("NUEVO_PERSONAL_ID").value;
        var PASSWORD      = document.getElementById("NUEVO_PERSONAL_PASSWORD").value;
        var CARGO         = document.getElementById("NUEVO_PERSONAL_CARGO").value;

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

                    if(document.getElementById("AÑADIR_PERSONAL_TEXTO_RESPUESTA")){
                        CUERPO.removeChild(CUERPO.lastChild)
                    }

                    if(!document.getElementById("AÑADIR_PERSONAL_TEXTO_RESPUESTA")){
                        var texto = document.createElement("p");
                        texto.innerHTML = "Añadido con éxito.";
                        texto.setAttribute("id","AÑADIR_PERSONAL_TEXTO_RESPUESTA");
                        CUERPO.appendChild(texto);
                    }
                    
                }
                if(textoRespuesta == "Existe el Identificador"){
                    
                    if(document.getElementById("AÑADIR_PERSONAL_TEXTO_RESPUESTA")){
                        CUERPO.removeChild(CUERPO.lastChild)
                    }

                    if(!document.getElementById("AÑADIR_PERSONAL_TEXTO_RESPUESTA")){
                        var texto = document.createElement("p");
                        texto.innerHTML = "El Identificador está ocupado actualmente.";
                        texto.setAttribute("id","AÑADIR_PERSONAL_TEXTO_RESPUESTA");
                        CUERPO.appendChild(texto);
                    }
                }
                
            })

            .catch(error => {
                console.error('Error al enviar los datos:' + error);
            });
        
        }else{

            if(document.getElementById("AÑADIR_PERSONAL_TEXTO_RESPUESTA")){
                CUERPO.removeChild(CUERPO.lastChild)
            }
            
            if(!document.getElementById("AÑADIR_PERSONAL_TEXTO_RESPUESTA")){
                var texto = document.createElement("p");
                texto.innerHTML = "No puedes dejar ningún campo vacío.";
                texto.setAttribute("id","AÑADIR_PERSONAL_TEXTO_RESPUESTA");
                CUERPO.appendChild(texto);
            }
        }
    }

    // ---------------------------------------------------------------------- //
    // Sección de código que nos eliminará el usuario seleccionado en la BBD.
    // ---------------------------------------------------------------------- //
    
    function eliminar_personal(){

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
            titulo.innerHTML = "¡ Cuidado ! los trabajadores que borres no se podrán recuperar";
            CUERPO.appendChild(titulo);

            var tabla = document.createElement("table");
            tabla.setAttribute("id","HOME_PERSONAL_EMPRESARIO");
            tabla.style.position = "relative";
            tabla.style.left = "48px";
            CUERPO.appendChild(tabla);

            // LOS USUARIOS
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
            columna.innerHTML = "Foto";
            fila.appendChild(columna);

            for(i = 0 ; i < textoRespuesta.length ; i++){

                if(textoRespuesta[i].nombre != undefined && textoRespuesta[i].rol != "empresario"){

                    var fila = document.createElement("tr");
                    tabla.appendChild(fila);

                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].dni;
                    fila.appendChild(columna);
                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].nombre;
                    fila.appendChild(columna);
                    var foto = document.createElement("img");
                    foto.setAttribute("src",textoRespuesta[i].foto_perfil);
                    foto.style.height = "64px";
                    foto.style.width = "64px";
                    foto.style.borderRadius = "9999px";
                    foto.style.position = "relative";
                    foto.style.left = "96px";
                    fila.appendChild(foto);
                    var boton = document.createElement("button");
                    boton.setAttribute("class",textoRespuesta[i].dni);
                    boton.setAttribute("id","EMPRESARIO_PERSONAL_ELIMINAR_BOTON");
                    boton.innerHTML = "Eliminar";
                    fila.appendChild(boton);

                }
                
            }

            // LOS IDENTIFICADORES

            var fila = document.createElement("tr");
            tabla.appendChild(fila);

            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "";
            fila.appendChild(columna);
            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Identificador";
            fila.appendChild(columna);
            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "Cargo";
            fila.appendChild(columna);

            for(i = 0 ; i < textoRespuesta.length ; i++){

                if(textoRespuesta[i].nombre == undefined && textoRespuesta[i].identificador_activo == "SI"){

                    var fila = document.createElement("tr");
                    tabla.appendChild(fila);

                    var columna = document.createElement("td");
                    columna.innerHTML = "";
                    fila.appendChild(columna);
                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].identificador;
                    fila.appendChild(columna);
                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].cargo;
                    columna.style.height = "64px";
                    columna.style.width = "64px";
                    fila.appendChild(columna);
                    var boton = document.createElement("button");
                    boton.setAttribute("class",textoRespuesta[i].identificador);
                    boton.setAttribute("id","EMPRESARIO_PERSONAL_ELIMINAR_BOTON");
                    boton.style.position = "relative";
                    boton.style.left = "68px";
                    boton.style.top = "24px";
                    boton.innerHTML = "Eliminar";
                    fila.appendChild(boton);

                }
                
            }

            // obtener el valor para luego hacer el modal
            var boton = document.querySelectorAll("button#EMPRESARIO_PERSONAL_ELIMINAR_BOTON");

                for (boton_seleccionado of boton) {

                    boton_seleccionado.addEventListener("click", (e) => {

                        var hijo = e.target;
                        var VALOR = hijo.getAttribute("class")
                       
                        validarDNI(VALOR) ? submit_eliminar_DNI(VALOR) : submit_eliminar_ID(VALOR);
                      
                    });
                }

        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });
    }

    function submit_eliminar_DNI(DNI){
       
        var modal = document.createElement("div");
                modal.style.height = "88px";
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
            
            texto.style.textAlign = "center";
            texto.style.fontFamily = "monospace";
            texto.innerHTML = "¿Estás seguro de eliminar al usuario <strong>"+DNI+"</strong>?. Una vez que aceptes no se podrá volver a atrás.";
            modal.appendChild(texto);

            var aceptar = document.createElement("button");
            aceptar.style.display = "block";
            aceptar.style.textAlign = "center";
            aceptar.style.margin = "0 auto";
            aceptar.style.border = "none";
            aceptar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            aceptar.style.color = "#F9260D";
            aceptar.style.width = "64px";
            aceptar.style.marginBottom = "8px";
            aceptar.style.cursor = "pointer";
            aceptar.innerHTML = "Aceptar";

            modal.appendChild(aceptar);

            var cancelar = document.createElement("button");
            cancelar.style.display = "block";
            cancelar.style.textAlign = "center";
            cancelar.style.margin = "0 auto";
            cancelar.style.border = "none";
            cancelar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            cancelar.style.cursor = "pointer";
            cancelar.style.width = "64px";
            cancelar.innerHTML = "Cancelar";

            modal.appendChild(cancelar);

            cancelar.addEventListener("click", () => {
                modal.remove();
            });

            aceptar.addEventListener("click", () => {

                DATOS = { dni : DNI,}

                fetch('/eliminar-personal/dni', {
                    method: 'DELETE',
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
    
                    if(textoRespuesta === "Correcto"){
                        modal.remove();
                        pantalla_inicio();
                    }
                })
    
                .catch(error => {
                    console.error('Error al enviar los datos:' + error);
                });
            })
            

    }

    function submit_eliminar_ID(IDENTIFICADOR){
       
        var modal = document.createElement("div");
                modal.style.height = "88px";
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
            
            texto.style.textAlign = "center";
            texto.style.fontFamily = "monospace";
            texto.innerHTML = "¿Estás seguro de eliminar el identificador <strong>"+IDENTIFICADOR+"</strong>?. Una vez que aceptes no se podrá volver a atrás.";
            modal.appendChild(texto);

            var aceptar = document.createElement("button");
            aceptar.style.display = "block";
            aceptar.style.textAlign = "center";
            aceptar.style.margin = "0 auto";
            aceptar.style.border = "none";
            aceptar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            aceptar.style.color = "#F9260D";
            aceptar.style.width = "64px";
            aceptar.style.marginBottom = "8px";
            aceptar.style.cursor = "pointer";
            aceptar.innerHTML = "Aceptar";

            modal.appendChild(aceptar);

            var cancelar = document.createElement("button");
            cancelar.style.display = "block";
            cancelar.style.textAlign = "center";
            cancelar.style.margin = "0 auto";
            cancelar.style.border = "none";
            cancelar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            cancelar.style.cursor = "pointer";
            cancelar.style.width = "64px";
            cancelar.innerHTML = "Cancelar";

            modal.appendChild(cancelar);

            cancelar.addEventListener("click", () => {
                modal.remove();
            });

            aceptar.addEventListener("click", () => {

                DATOS = { identificador : IDENTIFICADOR,}

                fetch('/eliminar-personal/id', {
                    method: 'DELETE',
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
    
                    if(textoRespuesta === "Correcto"){
                        modal.remove();
                        pantalla_inicio();
                    }
                })
    
                .catch(error => {
                    console.error('Error al enviar los datos:' + error);
                });
            })

    }

    // ---------------------------------------------------------------------- //
    // Sección de código que nos muestra a todos los trabajadores de la empresa.
    // ---------------------------------------------------------------------- //
    
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
            titulo.innerHTML = "Hola le damos la bienvenida a su Personal";
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

                if(textoRespuesta[i].nombre != undefined){

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
                }
                
            }
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });

    }
    
// ----------------------------------------------------------------------------------------------- // 

    // ---------------------------------------------------------------------- //
    // Función para validad DNI
    // ---------------------------------------------------------------------- //
    
    function validarDNI(dni) {
        var letras          = "TRWAGMYFPDXBNJZSQVHLCKE";
        var numero          = dni.substr(0,dni.length-1);
        var letra           = dni.substr(dni.length-1,1);
        var indice          = numero % 23;
        var letraCorrecta   = letras.charAt(indice);
        return letra === letraCorrecta;
    }

// ----------------------------------------------------------------------------------------------- // 

    // ---------------------------------------------------------------------- //
    // Función que nos muestra la lista de módulos
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_MODULOS").addEventListener("click", () => {
        vaciar_cuerpo(CUERPO);
        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Sección de Modulos !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Aquí dispone de todo el listado de módulos de TeamWork disponibles actualmente.";
        CUERPO.appendChild(texto);

        var contenedor = document.createElement("div");
        contenedor.setAttribute("id","HOME_CONTENEDOR_MODULOS");
        CUERPO.appendChild(contenedor);

        // --- > MODULO DE COLOR
        modulos
        (
            "color",
            "INTERFAZ CUSTOMIZABLE",
            "Este módulo permite personalizar la interfaz del home de todos los usuarios que pertenezca a su empresa. Para acceder a este módulo deberás ir a <strong> Empresa. </strong>",
            "MOD_COLOR",
            "Gratis"
        )

        // --- > MODULO DE CHAT
        modulos
        (
            "chat",
            "CHAT",
            "Este módulo permite establecer un chat grupal en tiempo real con todos los intengrantes de la empresa.",
            "MOD_CHAT",
            "1.99€"
        )

        // --- > MODULO DE CALENDARIO
        modulos
        (
            "calendario",
            "Calendario",
            "Este módulo permite crear un mini calendario visual dónde nos indicará el día y mes actual, y que aparecerá en la zona izquierda de la interfaz.",
            "MOD_CALENDARIO",
            "Gratis"
        )

        // --- > MODULO DE HORAS
        modulos
        (
            "hora",
            "Hora",
            "Este módulo permite visualizar la hora en tiempo real y esta aparecerá en la zona izquierda de la interfaz.",
            "MOD_HORA",
            "Gratis"
        )
 
        
    })

    // ---------------------------------------------------------------------- //
    // Función que actúa de plantilla para los módulos
    // ---------------------------------------------------------------------- //

    function modulos(FOTO, TITULO, TEXTO, IDENTIFICADOR, PRECIO){

        var CONTENEDOR = document.getElementById("HOME_CONTENEDOR_MODULOS");

        var BLOQUE = document.createElement("div");
        BLOQUE.setAttribute("id", "HOME_MODULO_PLANTILLA");
        CONTENEDOR.appendChild(BLOQUE);

        var IMAGEN = document.createElement("img");
        IMAGEN.style.height = "48px";
        IMAGEN.style.width = "48px";
        ICONO = "./img/icon/" + FOTO +".png";
        IMAGEN.setAttribute("src", ICONO);
        BLOQUE.appendChild(IMAGEN);

        var NOMBRE = document.createElement("h1");
        NOMBRE.setAttribute("id","HOME_MODULO_NOMBRE_MODULO");
        NOMBRE.innerHTML = TITULO;
        BLOQUE.appendChild(NOMBRE);

        var DESCRIPCION = document.createElement("p");
        DESCRIPCION.setAttribute("id", "HOME_MODULO_TEXTO_DESCRIPCION");
        DESCRIPCION.innerHTML = TEXTO;
        BLOQUE.appendChild(DESCRIPCION);

        var COMPRAR = document.createElement("button");
        COMPRAR.setAttribute("id",IDENTIFICADOR);
        COMPRAR.style.position = "relative";
        COMPRAR.style.top = "-72px";
        COMPRAR.style.left = "108px";
        COMPRAR.style.border = "none";
        COMPRAR.style.height = "32px";
        COMPRAR.style.width = "128px";
        COMPRAR.style.color = "black";
        COMPRAR.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
        COMPRAR.style.borderRadius = "99px";
        COMPRAR.style.cursor = "pointer";

        if(document.getElementById(IDENTIFICADOR + "_ADQUIRIDO")){
            COMPRAR.innerHTML = "Adquirido";
            COMPRAR.disabled = true;
            COMPRAR.style.cursor = "not-allowed";
            COMPRAR.style.background = "#6db840";
            COMPRAR.style.color = "white";
        }else{
            COMPRAR.innerHTML = "No Adquirido";
        }

        
        BLOQUE.appendChild(COMPRAR);

        var BOTON_PRECIO = document.createElement("button");
        (PRECIO == "Gratis") ? BOTON_PRECIO.style.background = "#478AC9" : BOTON_PRECIO.style.background = "#e8b023";
        BOTON_PRECIO.setAttribute("id", "HOME_MODULO_BOTON_PRECIO");
        BOTON_PRECIO.innerHTML = PRECIO;
        BLOQUE.appendChild(BOTON_PRECIO);

        
        COMPRAR.addEventListener("click", () => {
            comprar_modulo(IDENTIFICADOR);
        })

    }

    // ---------------------------------------------------------------------- //
    // Función que nos permite comprar un módulo.
    // ---------------------------------------------------------------------- //

    function comprar_modulo(IDENTIFICADOR){

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
            texto.innerHTML = "Estas apunto de comprar el módulo seleccionado anteriormente. ¿Estás de acuerdo?";
            texto.style.textAlign = "center";
            texto.style.fontFamily = "monospace";
            modal.appendChild(texto);

            var aceptar = document.createElement("button");
            aceptar.style.display = "block";
            aceptar.style.textAlign = "center";
            aceptar.style.margin = "0 auto";
            aceptar.style.border = "none";
            aceptar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            aceptar.style.width = "64px";
            aceptar.style.marginBottom = "8px";
            aceptar.style.cursor = "pointer";
            aceptar.innerHTML = "Comprar";

            modal.appendChild(aceptar);

            var cancelar = document.createElement("button");
            cancelar.style.display = "block";
            cancelar.style.textAlign = "center";
            cancelar.style.margin = "0 auto";
            cancelar.style.border = "none";
            cancelar.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            cancelar.style.cursor = "pointer";
            cancelar.style.width = "64px";
            cancelar.innerHTML = "Cancelar";

            modal.appendChild(cancelar);

            cancelar.addEventListener("click", () => {
                modal.remove();
            });

            aceptar.addEventListener("click", () => {

                DATOS = { 
                    id_empresa          : ID,
                    valor_identificador : IDENTIFICADOR
                }
        
                fetch('/comprar-modulo', {
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
        
                    window.location.reload();
                    modal.remove();
                })
        
                .catch(error => {
                    console.error('Error al enviar los datos:' + error);
                });

            })

    }

// ----------------------------------------------------------------------------------------------- // 

    // ---------------------------------------------------------------------- //
    // Todo lo relacionado con la configuración de la empresa.
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_EMPRESA").addEventListener("click", () => {
        
        vaciar_cuerpo(CUERPO);
        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Mi empresa !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Toda la configuración relacionada con tu empresa se encuentra aqui.";
        CUERPO.appendChild(texto);

        // OPCIONES
        var contenedor = document.createElement("div");
        contenedor.setAttribute("id","HOME_EMPRESA_DIV");
        contenedor.style.display = "flex",
        contenedor.style.marginTop = "48px";
        contenedor.style.justifyContent = "space-around";
        contenedor.style.textAlign = "center";
        contenedor.style.fontFamily = "monospace";
        contenedor.style.fontSize = "20px";
        contenedor.style.cursor = "pointer";
        CUERPO.appendChild(contenedor);

        var div = document.createElement("div");
        contenedor.appendChild(div);
        var modificar_empresa = document.createElement("img");
        modificar_empresa.setAttribute("src","./img/icon/empresa_imagen.png");
        modificar_empresa.style.height = "180px";
        modificar_empresa.style.width = "180px";
        var texto = document.createElement("p");
        texto.innerHTML = "Modificar foto de Empresa";
        div.appendChild(modificar_empresa);
        div.appendChild(texto);

        var div = document.createElement("div");
        contenedor.appendChild(div);
        var modificar_modulos = document.createElement("img");
        modificar_modulos.setAttribute("src","./img/icon/modulo.png");
        modificar_modulos.style.height = "180px";
        modificar_modulos.style.width = "180px";
        var texto = document.createElement("p");
        texto.innerHTML = "Configuración de Módulos";
        div.appendChild(modificar_modulos);
        div.appendChild(texto);

        var div = document.createElement("div");
        contenedor.appendChild(div);
        var busqueda_empleo = document.createElement("img");
        busqueda_empleo.setAttribute("src","./img/icon/aparecer_oferente.png");
        busqueda_empleo.style.height = "180px";
        busqueda_empleo.style.width = "180px";
        var texto = document.createElement("p");
        texto.innerHTML = "Búsqueda de Empleo";
        div.appendChild(busqueda_empleo);
        div.appendChild(texto);


        // EVENTOS
        modificar_empresa.addEventListener("click", () => { funcion_modificar_empresa(); })
        modificar_modulos.addEventListener("click", () => { funcion_modificar_modulo(); })
        busqueda_empleo.addEventListener("click", () => { funcion_busqueda_empleo();})

        


    })

    // ---------------------------------------------------------------------- //
    // Todo lo relacionado con la configuración de los módulos
    // ---------------------------------------------------------------------- //

    function funcion_modificar_empresa(){
        
        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Vas a cambiar la foto de tu empresa !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("h1");
        texto.setAttribute("id", "HOME_cuerpo_texto_nombre");
        texto.innerHTML = "La imagen debe ser en un formato PNG y pesar menos de 1MB.";
        CUERPO.appendChild(texto);

        var texto = document.createElement("h1");
        texto.setAttribute("id", "HOME_cuerpo_texto_no_nombre");
        texto.innerHTML = "Ten en cuenta que cuando cambies la foto de la empresa, se te cerrará la sesión para así guardar los cambios.";
        CUERPO.appendChild(texto);

        var formulario = document.createElement("form");
        formulario.setAttribute("action", "/subir-foto");
        formulario.setAttribute("method", "POST");
        formulario.setAttribute("enctype","multipart/form-data")
        CUERPO.appendChild(formulario);

        var input_empresa = document.createElement("input");
        input_empresa.setAttribute("type","text");
        input_empresa.setAttribute("name","dni");
        input_empresa.setAttribute("value",ID);
        input_empresa.style.display = "none";
        formulario.appendChild(input_empresa);

        var contenedor = document.createElement("div");
        contenedor.setAttribute("id","HOME_CONTENEDOR_FILE");
        contenedor.style.backgroundColor = COLOR;
        formulario.appendChild(contenedor);

        var input_file = document.createElement("input");
        input_file.setAttribute("type","file");
        input_file.setAttribute("name","imagen");
        input_file.setAttribute("id","HOME_SUBIR_FOTO_INPUT")
        contenedor.appendChild(input_file);

        var label_file = document.createElement("label");
        label_file.setAttribute("id","HOME_SUBIR_FOTO_LABEL")
        label_file.innerHTML = "Subir archivo...";
        contenedor.appendChild(label_file);

        var content_file = document.createElement("span");
        content_file.setAttribute("id","HOME_SUBIR_FOTO_CONTENT")
        contenedor.appendChild(content_file);

        var input_submit = document.createElement("input");
        input_submit.setAttribute("type", "submit");
        input_submit.setAttribute("value", "Enviar");
        input_submit.setAttribute("id","HOME_SUBIR_FOTO_SUBMIT")
        formulario.appendChild(input_submit);

        var imagen = document.createElement("img");
        var fotoID = document.getElementById("HOME_cuerpo_imagen_empresa");
        imagen.setAttribute("src", fotoID.src);
        imagen.style.height = "128px";
        imagen.style.width = "128px";
        imagen.style.top = "64px";
        imagen.style.left = "508px";
        imagen.style.borderRadius = "9999px";
        imagen.style.position = "relative";
        CUERPO.appendChild(imagen);

        document.getElementById("HOME_SUBIR_FOTO_INPUT").addEventListener("change", (event) => {
            var fileInfo = document.getElementById("HOME_SUBIR_FOTO_CONTENT");
            var inputFile = event.target;

            if (inputFile.files.length === 0) {
                fileInfo.textContent = "No se ha seleccionado ningún archivo.";
            } else {
                fileInfo.textContent = `Archivo seleccionado: ${inputFile.files[0].name}`;
            }
        })
    }

    // ---------------------------------------------------------------------- //
    // Permite mostrarse en la búsqueda de oferentes
    // ---------------------------------------------------------------------- //

    function funcion_busqueda_empleo(){
        
        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Búsqueda de Empleo !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Numerosas trabajadores sin empleo pueden desear pertenecer a tu empresa. ¿Deseas que tú empresa aparezca en la sección de búsqueda?";
        CUERPO.appendChild(texto);

        var boton_si = document.createElement("button");
        boton_si.setAttribute("id","APARECER_OFERENTE_BOTON");
        boton_si.setAttribute("value", "SI");
        boton_si.style.border = "none";
        boton_si.style.height = "32px";
        boton_si.style.width = "128px";
        boton_si.style.color = "black";
        boton_si.style.position = "relative";
        boton_si.style.left = "360px";
        boton_si.style.top = "128px";
        boton_si.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
        boton_si.style.borderRadius = "99px";

        var boton_no = document.createElement("button");
        boton_no.setAttribute("id", "APARECER_OFERENTE_BOTON");
        boton_no.setAttribute("value", "NO");
        boton_no.style.border = "none";
        boton_no.style.height = "32px";
        boton_no.style.width = "128px";
        boton_no.style.color = "black";
        boton_no.style.position = "relative";
        boton_no.style.left = "520px";
        boton_no.style.top = "128px";
        boton_no.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
        boton_no.style.borderRadius = "99px";

        if(APARECE_OFERENTE == "SI"){
                
            boton_si.innerHTML = "SI";
            boton_si.disabled = true;
            boton_si.style.cursor = "not-allowed";
            boton_si.style.background = "#6db840";
            boton_si.style.color = "white";
            CUERPO.appendChild(boton_si);


            boton_no.style.cursor = "pointer";
            boton_no.innerHTML = "NO";
            CUERPO.appendChild(boton_no);

        }

        if(APARECE_OFERENTE == "NO"){
                
            boton_si.style.cursor = "pointer";
            boton_si.innerHTML = "SI";
            CUERPO.appendChild(boton_si);

            boton_no.innerHTML = "NO";
            boton_no.disabled = true;
            boton_no.style.cursor = "not-allowed";
            boton_no.style.background = "#6db840";
            boton_no.style.color = "white";
            CUERPO.appendChild(boton_no);
 
        }

        var boton = document.querySelectorAll("button#APARECER_OFERENTE_BOTON");

        for (boton_seleccionado of boton) {

            boton_seleccionado.addEventListener("click", (e) => {

                var hijo = e.target;
                var RESPUESTA = hijo.value;
               

                DATOS = { 
                    id_empresa : ID,
                    aparece_oferente : RESPUESTA
                }

                fetch('/aparecer-oferente', {
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

                    window.location.reload();
                })

                .catch(error => {
                    console.error('Error al enviar los datos:' + error);
                });

            
            });
        }
    }

    // ---------------------------------------------------------------------- //
    // Todo lo relacionado con la configuración de los módulos
    // ---------------------------------------------------------------------- //

    function funcion_modificar_modulo(){

        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Configuración de Módulos !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Aquí podrás habilitar o deshabilitar tus módulos, o configurarlos.";
        CUERPO.appendChild(texto);

        // ---------------------------------------------------------------------- //
        //  ACTUALIZAR TODOS LOS MÓDULOS PARA LOS QUE NO LO TIENEN
        // ---------------------------------------------------------------------- //
        var boton = document.createElement("button");
        boton.innerHTML = "ACTUALIZAR MÓDULOS";
        boton.style.position = "relative";
        boton.style.top = "-64px";
        boton.style.left = "36px";
        boton.style.fontWeight = "bold";
        boton.style.border = "none";
        boton.style.height = "32px";
        boton.style.width = "256px";
        boton.style.color = "black";
        boton.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
        boton.style.borderRadius = "99px";
        boton.style.cursor = "pointer";
        boton.innerHTML = "Actualizar Módulos";
        CUERPO.appendChild(boton);

        boton.addEventListener("click", () => {


            if(document.getElementById("MOD_COLOR_ADQUIRIDO")){
                var COLOR2 = "SI";
            }else{
                var COLOR2 = "NO";
            }
            if(document.getElementById("MOD_CHAT_ADQUIRIDO")){
                var CHAT = "SI";
            }else{
                var CHAT = "NO";
            }
            if(document.getElementById("MOD_CALENDARIO_ADQUIRIDO")){
                var CALENDARIO = "SI";
            }else{
                var CALENDARIO = "NO";
            }
            if(document.getElementById("MOD_HORA_ADQUIRIDO")){
                var HORA = "SI";
            }else{
                var HORA = "NO";
            }
           
            DATOS = { 
                id_empresa : ID,
                MOD_COLOR : COLOR2,
                MOD_CALENDARIO : CALENDARIO,
                MOD_CHAT : CHAT,
                MOD_HORA : HORA
            }

            fetch('/actualizar-modulos', {
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

                pantalla_inicio();
            })

            .catch(error => {
                console.error('Error al enviar los datos:' + error);
            });

        })

        // ---------------------------------------------------------------------- //

        var CONTENEDOR = document.createElement("div");
        CONTENEDOR.setAttribute("id","HOME_CONTENEDOR_MODULOS");
        CUERPO.appendChild(CONTENEDOR);

        // ---------------------------------------------------------------------- //
        // MÓDULO COLOR
        // ---------------------------------------------------------------------- //
        if(document.getElementById("MOD_COLOR_ADQUIRIDO")){

            var BLOQUE = document.createElement("div");
            BLOQUE.setAttribute("id", "HOME_MODULO_PLANTILLA");
            BLOQUE.style.border = "2px solid black";
            BLOQUE.style.borderRadius = "8px";
            CONTENEDOR.appendChild(BLOQUE);
    
            var IMAGEN = document.createElement("img");
            IMAGEN.style.height = "48px";
            IMAGEN.style.width = "48px";
            IMAGEN.setAttribute("src", "./img/icon/color.png");
            BLOQUE.appendChild(IMAGEN);
    
            var NOMBRE = document.createElement("h1");
            NOMBRE.setAttribute("id","HOME_MODULO_NOMBRE_MODULO");
            NOMBRE.innerHTML = "Interfaz Customizable";
            BLOQUE.appendChild(NOMBRE);

            var HABILITADO = document.createElement("button");
            HABILITADO.setAttribute("id","CONFIGURACION_MODULOS");
            HABILITADO.setAttribute("value", "MOD_COLOR");

            var DESHABILITADO = document.createElement("button");
            DESHABILITADO.setAttribute("id", "CONFIGURACION_MODULOS");
            DESHABILITADO.setAttribute("value", "MOD_COLOR");

            if(document.getElementById("MOD_COLOR_ADQUIRIDO").value == "SI"){
                
                HABILITADO.innerHTML = "Habilitado";
                HABILITADO.style.color = "green";
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "123px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.innerHTML = "Habilitado";
                HABILITADO.disabled = true;
                HABILITADO.style.cursor = "not-allowed";
                HABILITADO.style.background = "#6db840";
                HABILITADO.style.color = "white";
                BLOQUE.appendChild(HABILITADO);
                
                DESHABILITADO.innerHTML = "Deshabilitado";
                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.style.cursor = "pointer";
                DESHABILITADO.innerHTML = "Deshabilitado";
                BLOQUE.appendChild(DESHABILITADO);



                // FUNCIONALIDAD
                var input = document.createElement("input");
                input.setAttribute("id","MODULO_COLOR_INPUT");
                input.setAttribute("value", COLOR);
                input.setAttribute("list", "color-options");
                input.setAttribute("type", "color");
                input.style.position = "relative";
                input.style.top = "-92px";
                input.style.left = "40px";
                BLOQUE.appendChild(input);

                var boton = document.createElement("button");
                boton.innerHTML = "Cambiar Color";
                boton.style.position = "relative";
                boton.style.top = "-96px";
                boton.style.left = "52px";
                boton.style.border = "none";
                boton.style.height = "32px";
                boton.style.width = "100px";
                boton.style.color = "black";
                boton.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                boton.style.borderRadius = "99px";
                boton.style.cursor = "pointer";
                BLOQUE.appendChild(boton);

                input.addEventListener("change", (e) => {
                
                    var coloresValidos = 
                    [
                        "#c94947", "#478ac9", "#26d836", "#ecee45", "#df951b",
                        "#ef2ab6","#970f80","#0bb6ae","#b61b0b","#220594",
                        "#60ac79","#a9612c","#aaaaaa","#666666","#000000"
                    ];

                    if (coloresValidos.indexOf(e.target.value.toLowerCase()) < 0) {
                        e.target.value = COLOR;
                        
                    }
                })

                boton.addEventListener("click", () => {

                    DATOS = { 
                        id_empresa : ID,
                        color : input.value
                    }

                    fetch('/modulos/color/cambiar-color', {
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

                    .then(textoRespuesta => { window.location.reload(); })

                    .catch(error => {
                        console.error('Error al enviar los datos:' + error);
                    });

                })
            }

                
            if(document.getElementById("MOD_COLOR_ADQUIRIDO").value == "INACTIVE"){
                
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "122px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.style.cursor = "pointer";
                HABILITADO.innerHTML = "Habilitado";
                BLOQUE.appendChild(HABILITADO);

                DESHABILITADO.style.color = "green";
                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.innerHTML = "Deshabilitado";
                DESHABILITADO.disabled = true;
                DESHABILITADO.style.cursor = "not-allowed";
                DESHABILITADO.style.background = "#6db840";
                DESHABILITADO.style.color = "white";
                BLOQUE.appendChild(DESHABILITADO);
                
                
            }
            
            

        }

        // ---------------------------------------------------------------------- //
        // MÓDULO CHAT
        // ---------------------------------------------------------------------- //
        if(document.getElementById("MOD_CHAT_ADQUIRIDO")){
            
            var BLOQUE = document.createElement("div");
            BLOQUE.setAttribute("id", "HOME_MODULO_PLANTILLA");
            BLOQUE.style.border = "2px solid black";
            BLOQUE.style.borderRadius = "8px";
            CONTENEDOR.appendChild(BLOQUE);

            var IMAGEN = document.createElement("img");
            IMAGEN.style.height = "48px";
            IMAGEN.style.width = "48px";
            IMAGEN.setAttribute("src", "./img/icon/chat.png");
            BLOQUE.appendChild(IMAGEN);

            var NOMBRE = document.createElement("h1");
            NOMBRE.setAttribute("id","HOME_MODULO_NOMBRE_MODULO");
            NOMBRE.innerHTML = "CHAT";
            BLOQUE.appendChild(NOMBRE);

            var HABILITADO = document.createElement("button");
            HABILITADO.setAttribute("id","CONFIGURACION_MODULOS");
            HABILITADO.setAttribute("value", "MOD_CHAT");

            var DESHABILITADO = document.createElement("button");
            DESHABILITADO.setAttribute("id", "CONFIGURACION_MODULOS");
            DESHABILITADO.setAttribute("value", "MOD_CHAT");

            if(document.getElementById("MOD_CHAT_ADQUIRIDO").value == "SI"){
                
                HABILITADO.style.color = "green";
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "122px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.innerHTML = "Habilitado";
                HABILITADO.disabled = true;
                HABILITADO.style.cursor = "not-allowed";
                HABILITADO.style.background = "#6db840";
                HABILITADO.style.color = "white";
                BLOQUE.appendChild(HABILITADO);

                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.style.cursor = "pointer";
                DESHABILITADO.innerHTML = "Deshabilitado";
                BLOQUE.appendChild(DESHABILITADO);

            }

            if(document.getElementById("MOD_CHAT_ADQUIRIDO").value == "INACTIVE"){
                
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "122px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.style.cursor = "pointer";
                HABILITADO.innerHTML = "Habilitado";
                BLOQUE.appendChild(HABILITADO);

                DESHABILITADO.style.color = "green";
                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.innerHTML = "Deshabilitado";
                DESHABILITADO.disabled = true;
                DESHABILITADO.style.cursor = "not-allowed";
                DESHABILITADO.style.background = "#6db840";
                DESHABILITADO.style.color = "white";
                BLOQUE.appendChild(DESHABILITADO);
                 
            }

        }

        // ---------------------------------------------------------------------- //
        // MÓDULO CALENDARIO
        // ---------------------------------------------------------------------- //
        if(document.getElementById("MOD_CALENDARIO_ADQUIRIDO")){
            
            var BLOQUE = document.createElement("div");
            BLOQUE.setAttribute("id", "HOME_MODULO_PLANTILLA");
            BLOQUE.style.border = "2px solid black";
            BLOQUE.style.borderRadius = "8px";
            CONTENEDOR.appendChild(BLOQUE);

            var IMAGEN = document.createElement("img");
            IMAGEN.style.height = "48px";
            IMAGEN.style.width = "48px";
            IMAGEN.setAttribute("src", "./img/icon/calendario.png");
            BLOQUE.appendChild(IMAGEN);

            var NOMBRE = document.createElement("h1");
            NOMBRE.setAttribute("id","HOME_MODULO_NOMBRE_MODULO");
            NOMBRE.innerHTML = "CALENDARIO";
            BLOQUE.appendChild(NOMBRE);

            var HABILITADO = document.createElement("button");
            HABILITADO.setAttribute("id","CONFIGURACION_MODULOS");
            HABILITADO.setAttribute("value", "MOD_CALENDARIO");

            var DESHABILITADO = document.createElement("button");
            DESHABILITADO.setAttribute("id", "CONFIGURACION_MODULOS");
            DESHABILITADO.setAttribute("value","MOD_CALENDARIO");

            if(document.getElementById("MOD_CALENDARIO_ADQUIRIDO").value == "SI"){
                
                HABILITADO.style.color = "green";
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "122px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.innerHTML = "Habilitado";
                HABILITADO.disabled = true;
                HABILITADO.style.cursor = "not-allowed";
                HABILITADO.style.background = "#6db840";
                HABILITADO.style.color = "white";
                BLOQUE.appendChild(HABILITADO);

                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.style.cursor = "pointer";
                DESHABILITADO.innerHTML = "Deshabilitado";
                BLOQUE.appendChild(DESHABILITADO);

            }

            if(document.getElementById("MOD_CALENDARIO_ADQUIRIDO").value == "INACTIVE"){
                
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "122px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.style.cursor = "pointer";
                HABILITADO.innerHTML = "Habilitado";
                BLOQUE.appendChild(HABILITADO);

                DESHABILITADO.style.color = "green";
                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.innerHTML = "Deshabilitado";
                DESHABILITADO.disabled = true;
                DESHABILITADO.style.cursor = "not-allowed";
                DESHABILITADO.style.background = "#6db840";
                DESHABILITADO.style.color = "white";
                BLOQUE.appendChild(DESHABILITADO);
                 
            }

        }

        // ---------------------------------------------------------------------- //
        // MÓDULO HORA
        // ---------------------------------------------------------------------- //
        if(document.getElementById("MOD_HORA_ADQUIRIDO")){

            var BLOQUE = document.createElement("div");
            BLOQUE.setAttribute("id", "HOME_MODULO_PLANTILLA");
            BLOQUE.style.border = "2px solid black";
            BLOQUE.style.borderRadius = "8px";
            CONTENEDOR.appendChild(BLOQUE);

            var IMAGEN = document.createElement("img");
            IMAGEN.style.height = "48px";
            IMAGEN.style.width = "48px";
            IMAGEN.setAttribute("src", "./img/icon/hora.png");
            BLOQUE.appendChild(IMAGEN);

            var NOMBRE = document.createElement("h1");
            NOMBRE.setAttribute("id","HOME_MODULO_NOMBRE_MODULO");
            NOMBRE.innerHTML = "HORA";
            BLOQUE.appendChild(NOMBRE);

            var HABILITADO = document.createElement("button");
            HABILITADO.setAttribute("id","CONFIGURACION_MODULOS");
            HABILITADO.setAttribute("value", "MOD_HORA");

            var DESHABILITADO = document.createElement("button");
            DESHABILITADO.setAttribute("id","CONFIGURACION_MODULOS");
            DESHABILITADO.setAttribute("value", "MOD_HORA");

            if(document.getElementById("MOD_HORA_ADQUIRIDO").value == "SI"){
                
                HABILITADO.style.color = "green";
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "122px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.innerHTML = "Habilitado";
                HABILITADO.disabled = true;
                HABILITADO.style.cursor = "not-allowed";
                HABILITADO.style.background = "#6db840";
                HABILITADO.style.color = "white";
                BLOQUE.appendChild(HABILITADO);

                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.style.cursor = "pointer";
                DESHABILITADO.innerHTML = "Deshabilitado";
                BLOQUE.appendChild(DESHABILITADO);

            }

            if(document.getElementById("MOD_HORA_ADQUIRIDO").value == "INACTIVE"){
                
                HABILITADO.style.position = "relative";
                HABILITADO.style.top = "-36px";
                HABILITADO.style.left = "122px";
                HABILITADO.style.border = "none";
                HABILITADO.style.height = "32px";
                HABILITADO.style.width = "128px";
                HABILITADO.style.color = "black";
                HABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                HABILITADO.style.borderRadius = "99px";
                HABILITADO.style.cursor = "pointer";
                HABILITADO.innerHTML = "Habilitado";
                BLOQUE.appendChild(HABILITADO);

                DESHABILITADO.style.color = "green";
                DESHABILITADO.style.position = "relative";
                DESHABILITADO.style.top = "-36px";
                DESHABILITADO.style.left = "133px";
                DESHABILITADO.style.border = "none";
                DESHABILITADO.style.height = "32px";
                DESHABILITADO.style.width = "128px";
                DESHABILITADO.style.color = "black";
                DESHABILITADO.style.boxShadow = "0 8px 8px rgb(102, 109, 114)";
                DESHABILITADO.style.borderRadius = "99px";
                DESHABILITADO.innerHTML = "Deshabilitado";
                DESHABILITADO.disabled = true;
                DESHABILITADO.style.cursor = "not-allowed";
                DESHABILITADO.style.background = "#6db840";
                DESHABILITADO.style.color = "white";
                BLOQUE.appendChild(DESHABILITADO);
                 
            }

        }
  
        // ---------------------------------------------------------------------- //
        // OBTENEMOS EL VALOR DEL BOTÓN PRESIONADO
        // ---------------------------------------------------------------------- //
        
        var boton = document.querySelectorAll("button#CONFIGURACION_MODULOS");

        for (boton_seleccionado of boton) {

            boton_seleccionado.addEventListener("click", (e) => {

                var hijo = e.target;
                var VALOR = hijo.value;
                habilitar_deshabilitar_modulo(VALOR);
            
            });
        }
    }

    // ---------------------------------------------------------------------- //
    // HABILITAR O DESHABILITAR EL MÓDULO QUE HAYAMOS PRESIONADO
    // ---------------------------------------------------------------------- //
    
    function habilitar_deshabilitar_modulo(MODULO){
        
        if(document.getElementById(MODULO+"_ADQUIRIDO").value == "SI"){
            var nuevo_valor = "INACTIVE";
        }else{
            var nuevo_valor = "SI";
        }

        DATOS = { 
            id_empresa : ID,
            MODULO : MODULO,
            estado : nuevo_valor
        }

        fetch('/cambiar-estado-modulo', {
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

            window.location.reload();
            
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });

    }


}