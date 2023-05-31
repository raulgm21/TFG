// ------------------------------- VARIABLES ------------------------------- //
    const CUERPO    = document.getElementById("HOME_cuerpo");
    const DNI       = document.getElementById("HOME_DNI_USUARIO").value;
    const EMPRESA   = document.getElementById("HOME_nombre_empresa").textContent;
    const NOMBRE    = document.getElementById("HOME_nombre").textContent;
    const ID        = document.getElementById("HOME_ID_EMPRESA").value;
    const DATE      = document.getElementById("HOME_DATE_USUARIO").value;
    const CORREO    = document.getElementById("HOME_CORREO_USUARIO").value;
    const CARGO     = document.getElementById("HOME_CARGO_USUARIO").value;

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
    // MÓDULO HORAS
    // ---------------------------------------------------------------------- //

    if(document.getElementById("MOD_HORA_ADQUIRIDO") && document.getElementById("MOD_HORA_ADQUIRIDO").value == "SI"){
        
        function imprimirHora() {
            document.getElementById("HOME_HORA_ACTUAL").innerHTML = new Date().toLocaleTimeString();
        }
          
        setInterval(imprimirHora, 1000);

    }

    // ---------------------------------------------------------------------- //
    // MÓDULO CALENDARIO
    // ---------------------------------------------------------------------- //

    if(document.getElementById("MOD_CALENDARIO_ADQUIRIDO") && document.getElementById("MOD_CALENDARIO_ADQUIRIDO").value == "SI"){

        function crearCalendario() {
            // Variables
            const hoy          = new Date();
            const mes          = hoy.getMonth();
            const ano          = hoy.getFullYear();
            const primerDiaMes = new Date(ano, mes, 1);
            const ultimoDiaMes = new Date(ano, mes + 1, 0);
            const diasSemana   = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
            const meses        = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
          
            // Mes y Año ACTUAL
            let tabla = `<table><caption style="background : ${COLOR} ; color : white">${meses[mes]} ${ano}</caption><thead><tr>`;
          
            // Mostrar Días de la Semana
            for (let i = 0; i < 7; i++) {
                const diaIndex = i % 7;
                tabla += `<th>${diasSemana[diaIndex]}</th>`;
            }
            tabla += '</tr></thead><tbody><tr>';
          
            for (let i = 1; i < primerDiaMes.getDay(); i++) {
                tabla += '<td></td>';
            }

            for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
    
                const fechaActual = new Date(ano, mes, dia);
                
                if (fechaActual.getDay() === 1 && dia !== 1) {
                tabla += '</tr><tr>';
                }
    
                if (dia === hoy.getDate()) {
                    tabla += `<td id="HOME_CALENDARIO_HOY" style="background : ${COLOR}">${dia}</td>`;
                    
                }else {
                    tabla += `<td>${dia}</td>`;
                }
            }
          
            document.getElementById('HOME_CALENDARIO').innerHTML = tabla;
        }
    
        crearCalendario();

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
        var fotoID = document.getElementById("HOME_foto_perfil");
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
    })

// ----------------------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // Sección de código que nos permite consultar información sobre la cuenta
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_mi_cuenta").addEventListener("click", () => {
       
        const FECHA_ACTUAL  = new Date();
        const FECHA_USUARIO = new Date(DATE);
        const DIFERENCIA = Math.floor( (FECHA_ACTUAL - FECHA_USUARIO) / (1000 * 60 * 60 * 24) );

        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = " Mi cuenta ";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("h1");
        texto.setAttribute("id", "HOME_cuerpo_texto_nombre");
        texto.innerHTML = "¡Toda la información sobre su cuenta está disponible aquí!";
        CUERPO.appendChild(texto);

        var contenedor = document.createElement("div");
        contenedor.setAttribute("id","HOME_MI_CUENTA_DIV");
        CUERPO.appendChild(contenedor);

        var dni_texto = document.createElement("p");
        dni_texto.innerHTML = "<strong>DNI</strong>     : " + DNI;
        contenedor.appendChild(dni_texto);

        var nombre_texto = document.createElement("p");
        nombre_texto.innerHTML = "<strong>NOMBRE</strong>: " + NOMBRE;
        contenedor.appendChild(nombre_texto);

        var CORREO_texto = document.createElement("p");
        CORREO_texto.innerHTML = "<strong>CORREO</strong>: " + CORREO;
        contenedor.appendChild(CORREO_texto);

        var CARGO_texto = document.createElement("p");
        CARGO_texto.innerHTML = "<strong>CARGO</strong>   : " + CARGO;
        contenedor.appendChild(CARGO_texto);

        var dias_texto = document.createElement("p");
        if(DIFERENCIA == 1){
            dias_texto.innerHTML = "<em>Tu cuenta lleva un total de <strong> " + DIFERENCIA + " día </strong> desde que fue creada.</em>";
            contenedor.appendChild(dias_texto);
        }else{
            dias_texto.innerHTML = "<em>Tu cuenta lleva un total de <strong> " + DIFERENCIA + " días </strong> desde que fue creada.</em>";
            contenedor.appendChild(dias_texto);
        }

        var imagen = document.createElement("img");
        var fotoID = document.getElementById("HOME_foto_perfil");
        imagen.setAttribute("src", fotoID.src);
        imagen.style.height = "360px";
        imagen.style.width = "360px";
        imagen.style.top = "-264px";
        imagen.style.left = "730px";
        imagen.style.borderRadius = "9999px";
        imagen.style.position = "relative";
        CUERPO.appendChild(imagen);

    })

// ----------------------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // Sección de código que nos permite configurar la cuenta.
    // --> Cambiar Nombre
    // --> Cambiar Password
    // --> Ver Tutorial
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_configuracion").addEventListener("click", () => {
       
        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = " Configuración ";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("h1");
        texto.setAttribute("id", "HOME_cuerpo_texto_nombre");
        texto.innerHTML = "¡Toda la configuración sobre su cuenta está disponible aquí!";
        CUERPO.appendChild(texto);

        var contenedor = document.createElement("div");
        contenedor.setAttribute("id","HOME_CONFIGURACION_DIV");
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
        var cambiar_nombre = document.createElement("img");
        cambiar_nombre.setAttribute("src","./img/icon/usuario.png");
        cambiar_nombre.style.height = "180px";
        cambiar_nombre.style.width = "180px";
        var texto = document.createElement("p");
        texto.innerHTML = "Cambiar Nombre";
        div.appendChild(cambiar_nombre);
        div.appendChild(texto);

        var div = document.createElement("div");
        contenedor.appendChild(div);
        var cambiar_password = document.createElement("img");
        cambiar_password.setAttribute("src","./img/icon/password.png");
        cambiar_password.style.height = "180px";
        cambiar_password.style.width = "180px";
        var texto = document.createElement("p");
        texto.innerHTML = "Cambiar Contraseña";
        div.appendChild(cambiar_password);
        div.appendChild(texto);

        var div = document.createElement("div");
        contenedor.appendChild(div);
        var mirar_tutorial = document.createElement("img");
        mirar_tutorial.setAttribute("src","./img/icon/tutorial.png");
        mirar_tutorial.style.height = "180px";
        mirar_tutorial.style.width = "180px";
        var texto = document.createElement("p");
        texto.innerHTML = "Mirar Tutorial";
        div.appendChild(mirar_tutorial);
        div.appendChild(texto);


        // CAMBIAR NOMBRE
        cambiar_nombre.addEventListener("click", () => {

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
            texto.innerHTML = `Vas a cambiar tú nombre de usuario. Su nombre actual es: <strong>${NOMBRE}</strong>.`;
            texto.style.textAlign = "center";
            texto.style.fontFamily = "monospace";
            modal.appendChild(texto);

            var textarea = document.createElement("textarea");
            textarea.setAttribute("id","CORREO_TEXTAREA");
            textarea.style.overflow = "hidden";
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
            
                if(textarea.value.length >= 3){

                
                    DATOS = { 
                        dni     : DNI,
                        nombre  : textarea.value,
                    }

                    
                    fetch('/cambiar-nombre', {
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

                        if(textoRespuesta == "Correcto"){
                            modal.remove();
                            window.location.reload();
                        }else{
                            alert("Ha ocurrido algún error a la hora de cambiar el nombre, intentelo de nuevo");
                        }
                         
                    })

                    .catch(error => {
                        console.error('Error al enviar los datos:' + error);
                    });

                }else{
                    alert("No puede tener menos de tres caracteres");
                }
            
            });

            var salir = document.createElement("button");
            salir.style.display = "block";
            salir.style.textAlign = "center";
            salir.style.margin = "0 auto";
            salir.style.border = "none";
            salir.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            salir.style.position = "relative";
            salir.style.top = "16px";
            salir.innerHTML = "Salir"
            modal.appendChild(salir);

            salir.addEventListener("click", () => {
                modal.remove();
            });

        })

        // CAMBIAR PASSWORD
        cambiar_password.addEventListener("click", () => {
            
            var modal = document.createElement("div");
            modal.style.height = "170px";
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
            texto.innerHTML = `Vas a cambiar su contraseña para su usuario <strong>${NOMBRE}</strong>.`;
            texto.style.textAlign = "center";
            texto.style.fontFamily = "monospace";
            modal.appendChild(texto);

            var actual = document.createElement("input");
            actual.setAttribute("id","CORREO_TEXTAREA");
            actual.setAttribute("type", "password");
            actual.setAttribute("placeholder", "Inserte su contraseña actual");
            actual.style.height = "32px";
            modal.appendChild(actual);

            var nueva = document.createElement("input");
            nueva.setAttribute("id","CORREO_TEXTAREA");
            nueva.setAttribute("type", "password");
            nueva.setAttribute("placeholder", "Inserte su contraseña nueva (min 8 caracts.)");
            nueva.style.height = "32px";
            nueva.style.marginTop = "12px";
            modal.appendChild(nueva);


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

                if(nueva.value.length >= 8 && actual.value.length >= 8){

                    DATOS = { 
                        dni          : DNI,
                        pass_actual  : actual.value,
                        pass_nueva   : nueva.value
                    }

                    fetch('/cambiar-password', {
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

                        if(textoRespuesta == "Correcto"){
                            modal.remove();
                            window.location.reload();
                        }else{
                            if(textoRespuesta == "Error"){
                                alert("La contraseña actual no es correcta");
                            }else{
                                alert("Ha ocurrido algún error a la hora de cambiar la contraseña, intentelo de nuevo");
                            }
                        }
                         
                    })

                    .catch(error => {
                        console.error('Error al enviar los datos:' + error);
                    });

                }else{
                    alert("No puede tener menos de ocho caracteres");
                }
            
            });

            var salir = document.createElement("button");
            salir.style.display = "block";
            salir.style.textAlign = "center";
            salir.style.margin = "0 auto";
            salir.style.border = "none";
            salir.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
            salir.style.position = "relative";
            salir.style.top = "16px";
            salir.innerHTML = "Salir"
            modal.appendChild(salir);

            salir.addEventListener("click", () => {
                modal.remove();
            });

        })
        
        // MIRAR TUTORIAL
        mirar_tutorial.addEventListener("click", () => {

            if(CARGO == "Empresario"){
                alert("TUTO EMPR");
            }
    
            if(CARGO == "Oferente"){
                alert("TUTO OFE")
            }
    
            if(CARGO != "Empresario" && CARGO != "Oferente"){
                alert("TUTO TRA")
            }
        })

    })

// ----------------------------------------------------------------------------------------------- // 

    // ---------------------------------------------------------------------- //
    // Correo
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_CORREO").addEventListener("click", pantalla_correo)

    // ---------------------------------------------------------------------- //
    // Interfaz
    // ---------------------------------------------------------------------- //

    function pantalla_correo(){

        vaciar_cuerpo(CUERPO);
        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        if(CARGO == "Oferente"){
            titulo.innerHTML = "¡ Mensajes !";
        }else{
            titulo.innerHTML = "¡ Correo !";
        }
        
        CUERPO.appendChild(titulo);

        var contenedor_correo = document.createElement("div");
        contenedor_correo.style.display = "flex";
        contenedor_correo.style.flexDirection = "row";
        contenedor_correo.style.justifyContent = "center";
        CUERPO.appendChild(contenedor_correo);

        var div_izquierda = document.createElement("div");
        div_izquierda.setAttribute("id","CORREO_DIV_IZQUIERDA");
        contenedor_correo.appendChild(div_izquierda);

        var div_derecha = document.createElement("div");
        div_derecha.setAttribute("id","CORREO_DIV_DERECHA");
        contenedor_correo.appendChild(div_derecha);

        // LADO IZQUIERDO -> USUARIOS

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
          
            var tabla = document.createElement("table");
            tabla.setAttribute("id","HOME_PERSONAL_EMPRESARIO");
            div_izquierda.appendChild(tabla);

            var fila = document.createElement("tr");
            tabla.appendChild(fila);

            if(CARGO != "Oferente"){

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
                columna.innerHTML = "Foto";
                fila.appendChild(columna);
                var columna = document.createElement("th");
                columna.style.backgroundColor = COLOR;
                columna.innerHTML = "";
                fila.appendChild(columna);

            }else{

                var columna = document.createElement("th");
                columna.style.backgroundColor = COLOR;
                columna.innerHTML = "Empresa";
                fila.appendChild(columna);
                var columna = document.createElement("th");
                columna.style.backgroundColor = COLOR;
                columna.innerHTML = "Correo";
                fila.appendChild(columna);
                var columna = document.createElement("th");
                columna.style.backgroundColor = COLOR;
                columna.innerHTML = "";
                fila.appendChild(columna);

            }
            for(i = 0 ; i < textoRespuesta.length ; i++){

                if(textoRespuesta[i].nombre != undefined){

                    var fila = document.createElement("tr");
                    tabla.appendChild(fila);

                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].nombre;
                    fila.appendChild(columna);
                    var columna = document.createElement("td");
                    columna.innerHTML = textoRespuesta[i].correo;
                    fila.appendChild(columna);
                    var foto = document.createElement("img");
                    foto.setAttribute("src",textoRespuesta[i].foto_perfil);
                    foto.style.height = "64px";
                    foto.style.width = "64px";
                    foto.style.borderRadius = "9999px";
                    foto.style.position = "relative";
                    foto.style.left = "40px";
                    fila.appendChild(foto);

                    var columna = document.createElement("img");
                    columna.setAttribute("id","CORREO_MENSAJE");
                    columna.setAttribute("class", textoRespuesta[i].correo);
                    columna.style.height = "32px";
                    columna.style.width = "32px";
                    columna.style.position = "relative";
                    columna.style.top = "-12px";
                    columna.style.left = "140px";
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
                    var VALOR = hijo.getAttribute("class")
                    escribir_correo(VALOR);

                });
            }
            
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });


        // LADO DERECHO -> CORREOS

        DATOS = { envia : CORREO,}

        fetch('/consultar-correo', {
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

            for(i = 0 ; i < textoRespuesta.length ; i++){

                var div = document.createElement("div");
                div.style.width = "500px";
                div.style.marginLeft = "8px";
                div.style.marginBottom = "16px";
                div.style.height = "100px";
                div.style.overflowY = "scroll";
                div.style.overflowX = "hidden";
                div.style.background = "#E8E8E8";
                div.style.borderRadius = "8px";
                div_derecha.appendChild(div);

                var imagen = document.createElement("img");
                imagen.style.height = "32px";
                imagen.style.width = "32px";
                imagen.style.position = "relative";
                imagen.style.top = "8px";
                imagen.style.left = "8px";

                var texto = document.createElement("p");
                texto.style.fontWeight = "bolder";
                texto.style.fontFamily = "monospace";
                texto.style.position = "relative";
                texto.style.top = "-36px";
                texto.style.left = "56px";

                var mensaje = document.createElement("p");
                mensaje.style.fontFamily = "monospace";
                mensaje.style.textAlign = "justify";
                mensaje.style.position = "relative";
                mensaje.style.left = "16px";
                mensaje.style.top = "-30px";

                // ENVIADO
                if(textoRespuesta[i].envia == CORREO && textoRespuesta[i].estado != "MISMO"){
                    
                    imagen.setAttribute("src","./img/icon/enviar.png");
                    div.appendChild(imagen);
                    
                    texto.style.color = "rgb(34,177,76)";
                    texto.innerHTML = "ENVÍADO a " + textoRespuesta[i].recibe;
                    div.appendChild(texto);
                     
                }

                // RECIBIDO
                if(textoRespuesta[i].recibe == CORREO && textoRespuesta[i].estado != "MISMO"){
                    
                    imagen.setAttribute("src","./img/icon/recibir.png");
                    div.appendChild(imagen);

                    texto.style.color = "rgb(255,127,39)";
                    texto.innerHTML = "RECIBIDO de " + textoRespuesta[i].envia;
                    div.appendChild(texto);

                }

                // YO MISMO
                if(textoRespuesta[i].recibe == textoRespuesta[i].envia && textoRespuesta[i].estado == "MISMO"){
                    
                    imagen.setAttribute("src","./img/icon/mismo.png");
                    div.appendChild(imagen);

                    texto.style.color = "rgb(0,162,232)";
                    texto.innerHTML = "ENVÍADO A MI MISMO";
                    div.appendChild(texto);

                }

                mensaje.innerHTML = textoRespuesta[i].mensaje;
                div.appendChild(mensaje);

            }

            if(textoRespuesta.length == 0){
                var div = document.createElement("div");
                div.style.width = "500px";
                div.style.marginLeft = "8px";
                div.style.marginBottom = "16px";
                div.style.height = "100px";
                div.style.overflowX = "hidden";
                div.style.borderRadius = "8px";
                div_derecha.appendChild(div);

                var texto = document.createElement("p");
                texto.style.fontWeight = "bolder";
                texto.style.fontFamily = "monospace";
                texto.style.position = "relative";
                texto.style.fontSize = "24px";
                texto.style.textAlign = "center";
                if(CARGO == "Oferente"){
                    texto.innerHTML = "No tienes ningún mensaje";
                }else{
                    texto.innerHTML = "No tienes ningún correo";
                }
                
                div.appendChild(texto);
            }
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });
    }

    // ---------------------------------------------------------------------- //
    // Mandar Correo
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
        texto.innerHTML = `De acuerdo vas a mandar un correo a <strong>${CORREO_QUIEN_RECIBE}</strong>. Escriba el mensaje que desees que reciba.`;
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
            
            if(CORREO_QUIEN_ENVIA == CORREO_QUIEN_RECIBE){

                DATOS = { 
                    envia   : CORREO_QUIEN_ENVIA,
                    recibe  : CORREO_QUIEN_RECIBE,
                    mensaje : textarea.value,
                    estado  : "MISMO"
                }

            }else{

                DATOS = { 
                    envia   : CORREO_QUIEN_ENVIA,
                    recibe  : CORREO_QUIEN_RECIBE,
                    mensaje : textarea.value,
                    estado  : "NO LEÍDO"
                }

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