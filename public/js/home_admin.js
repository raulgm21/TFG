// ----------------------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // CALENDARIO
    // ---------------------------------------------------------------------- //

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
    
        document.getElementById('HOME_CALENDARIO_ADMIN').innerHTML = tabla;
    }

    crearCalendario();

// ----------------------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // INICIO
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_INICIO").addEventListener("click", () => {window.location.reload();})

// ----------------------------------------------------------------------------------------------- //

    // ---------------------------------------------------------------------- //
    // ADMINISTRACIÓN
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_ADMINISTRACION").addEventListener("click", () => {

        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Administración de TeamWork !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Aquí se puede añadir, eliminar, modificar o consultar personal administrativo.";
        CUERPO.appendChild(texto);

        var calendario = document.getElementById("HOME_CALENDARIO_ADMIN");
        var div_home = document.getElementById("div_home");
        if(document.getElementById("HOME_CALENDARIO_ADMIN")){
            div_home.removeChild(calendario);
        }

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
        var introducir = document.createElement("img");
        introducir.setAttribute("src","./img/icon/introducir_admin.png");
        introducir.style.height = "160px";
        introducir.style.width = "160px";
        var texto = document.createElement("p");
        texto.innerHTML = "Añadir Administrador";
        div.appendChild(introducir);
        div.appendChild(texto);

        var div = document.createElement("div");
        contenedor.appendChild(div);
        var eliminar = document.createElement("img");
        eliminar.setAttribute("src","./img/icon/eliminar_admin.png");
        eliminar.style.height = "160px";
        eliminar.style.width = "160px";
        var texto = document.createElement("p");
        texto.innerHTML = "Eliminar Admin";
        div.appendChild(eliminar);
        div.appendChild(texto);

        var div = document.createElement("div");
        contenedor.appendChild(div);
        var consultar = document.createElement("img");
        consultar.setAttribute("src","./img/icon/consultar_admin.png");
        consultar.style.height = "160px";
        consultar.style.width = "160px";
        var texto = document.createElement("p");
        texto.innerHTML = "Consultar Administradores";
        div.appendChild(consultar);
        div.appendChild(texto);


        // EVENTOS
        introducir.addEventListener("click", () => {
            introducir_administrador();
        })
        eliminar.addEventListener("click", () => {
            eliminar_administrador();
        })
        consultar.addEventListener("click", () => {
            consultar_administrador();
        })

    })
    
    // ---------------------------------------------------------------------- //
    // INTRODUCIR
    // ---------------------------------------------------------------------- //

    function introducir_administrador(){

        var modal = document.createElement("div");
            modal.style.height = "220px";
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

            CUERPO.appendChild(modal);

            var texto = document.createElement("p");
            texto.innerHTML = `Vas a introducir un nuevo <strong>administrador</strong>. Rellene los campos:`;
            texto.style.textAlign = "center";
            texto.style.fontFamily = "monospace";
            modal.appendChild(texto);

            var DNI = document.createElement("input");
            DNI.setAttribute("id","CORREO_TEXTAREA");
            DNI.setAttribute("type", "text");
            DNI.setAttribute("placeholder", "Inserte su DNI");
            DNI.style.height = "32px";
            modal.appendChild(DNI);

            var NOMBRE = document.createElement("input");
            NOMBRE.setAttribute("id","CORREO_TEXTAREA");
            NOMBRE.setAttribute("type", "text");
            NOMBRE.setAttribute("placeholder", "Inserte su NOMBRE");
            NOMBRE.style.height = "32px";
            modal.appendChild(NOMBRE);

            var CORREO = document.createElement("input");
            CORREO.setAttribute("id","CORREO_TEXTAREA");
            CORREO.setAttribute("type", "text");
            CORREO.setAttribute("placeholder", "Inserte su CORREO");
            CORREO.style.height = "32px";
            modal.appendChild(CORREO);


            var PASSWORD = document.createElement("input");
            PASSWORD.setAttribute("id","CORREO_TEXTAREA");
            PASSWORD.setAttribute("type", "password");
            PASSWORD.setAttribute("placeholder", "Inserte su CONTRASEÑA");
            PASSWORD.style.height = "32px";
            modal.appendChild(PASSWORD);

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

            let allowClick = true;

            // ---- ENVIAR ---- //
            enviar.addEventListener("click", () => {
            
                    // Expresiones Regulares
                    var solo_letras = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/;
    
                    // Función para validar gmail (.com)
                    function validarGmail(correo) {
                        var regexGmail = /^[\w.-]+@gmail\.com$/;
                        return regexGmail.test(correo);
                    }

                    // Función para validad DNI
                    function validarDNI(dni) {
                        
                        var letras          = "TRWAGMYFPDXBNJZSQVHLCKE";
                        var numero          = dni.substr(0,dni.length-1);
                        var letra           = dni.substr(dni.length-1,1);
                        var indice          = numero % 23;
                        var letraCorrecta   = letras.charAt(indice);
                        return letra === letraCorrecta;
                    }

                    // ------------------------- VALIDAR ----------------------- //
            
                    // -> Correo
                    if(validarGmail(CORREO.value) && CORREO.value.length > 12){
                        // Correcto
                        CORREO.style.color = "green";
                        CORREO.style.fontWeight = "bold";
                    }else{
                        // Error
                        CORREO.style.color = "red";
                        CORREO.style.fontWeight = "bold";
                    }

                    // -> Nombre
                    if(NOMBRE.value.length >= 3 && solo_letras.test(NOMBRE.value)){
                        NOMBRE.style.color = "green";
                        NOMBRE.style.fontWeight = "bold";
                    }else{
                        NOMBRE.style.color = "red";
                        NOMBRE.style.fontWeight = "bold";
                    }

                    // -> Contraseña
                    if(PASSWORD.value.length >= 8){
                        PASSWORD.style.color = "green";
                        PASSWORD.style.fontWeight = "bold";
                    }else{
                        PASSWORD.style.color = "red";
                        PASSWORD.style.fontWeight = "bold";
                    }

                    // -> DNI
                    if(validarDNI(DNI.value)){
                        DNI.style.color = "green";
                        DNI.style.fontWeight = "bold";
                    }else{
                        DNI.style.color = "red";
                        DNI.style.fontWeight = "bold";
                    }

                    if
                    (
                        validarGmail(CORREO.value) && CORREO.value.length > 12 && NOMBRE.value.length >= 3 && 
                        solo_letras.test(NOMBRE.value)  && PASSWORD.value.length >= 8 && validarDNI(DNI.value)
                    )
                    {
                        DATOS = { 
                            dni     : DNI.value,
                            nombre  : NOMBRE.value,
                            password : PASSWORD.value,
                            correo   : CORREO.value
                        }

                        
                        fetch('/insertar-admin', {
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
                                modal.remove();
                                window.location.reload();
                            }
                            
                        })

                        .catch(error => {
                            console.error('Error al enviar los datos:' + error);
                        });

                    }else{
                        allowClick = false;
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
    }

    // ---------------------------------------------------------------------- //
    // ELIMINAR
    // ---------------------------------------------------------------------- //

    function eliminar_administrador(){

        fetch('/mostrar-administradores', {
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
          
            vaciar_cuerpo(CUERPO);

            var titulo = document.createElement("h1");
            titulo.setAttribute("id", "HOME_cuerpo_titulo");
            titulo.innerHTML = "¡ Cuidado ! los administradores que borres no se podrán recuperar";
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
            columna.innerHTML = "Foto";
            fila.appendChild(columna);
            var columna = document.createElement("th");
            columna.style.backgroundColor = COLOR;
            columna.innerHTML = "";
            fila.appendChild(columna);

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
                    var foto = document.createElement("img");
                    foto.setAttribute("src",textoRespuesta[i].foto_perfil);
                    foto.style.height = "64px";
                    foto.style.width = "64px";
                    foto.style.borderRadius = "9999px";
                    foto.style.position = "relative";
                    foto.style.left = "80px";
                    fila.appendChild(foto);
                    var boton = document.createElement("button");
                    boton.setAttribute("class",textoRespuesta[i].dni);
                    boton.setAttribute("id","EMPRESARIO_PERSONAL_ELIMINAR_BOTON");
                    boton.innerHTML = "Eliminar";
                    boton.style.position = "relative";
                    boton.style.left = "224px";
                    fila.appendChild(boton);

                }
                
            }

            // obtener el valor para luego hacer el modal
            var boton = document.querySelectorAll("button#EMPRESARIO_PERSONAL_ELIMINAR_BOTON");

                for (boton_seleccionado of boton) {

                    boton_seleccionado.addEventListener("click", (e) => {

                        var hijo = e.target;
                        var VALOR = hijo.getAttribute("class")
                        submit_eliminar(VALOR);
                    });
                }

        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });
    }

    // ---------------------------------------------------------------------- //
    // ELIMINAR SUGMIT
    // ---------------------------------------------------------------------- //

    function submit_eliminar(DNI){

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
            texto.innerHTML = "¿Estás seguro de eliminar al admin <strong>"+DNI+"</strong>?. Una vez que aceptes no se podrá volver a atrás.";
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

                fetch('/eliminar-administrador', {
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
                        window.location.reload();
                    }
                })
    
                .catch(error => {
                    console.error('Error al enviar los datos:' + error);
                });
            })
    }


    // ---------------------------------------------------------------------- //
    // CONSULTAR
    // ---------------------------------------------------------------------- //
    function consultar_administrador(){

        fetch('/mostrar-administradores', {
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
          
            vaciar_cuerpo(CUERPO);

            var titulo = document.createElement("h1");
            titulo.setAttribute("id", "HOME_cuerpo_titulo");
            titulo.innerHTML = "¡ Listado de todos los administradores de TeamWork !";
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

                    var foto = document.createElement("img");
                    foto.setAttribute("src",textoRespuesta[i].foto_perfil);
                    foto.style.height = "64px";
                    foto.style.width = "64px";
                    foto.style.borderRadius = "9999px";
                    foto.style.position = "relative";
                    foto.style.left = "96px";
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
    // ESTADISTICAS
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_ESTADISTICAS").addEventListener("click", () => {

        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡ Estadísticas !";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Aquí se puede comprobar todos los tipos de usuarios registrados en la aplicación, y de la viabilidad de los módulos.";
        CUERPO.appendChild(texto);

        var calendario = document.getElementById("HOME_CALENDARIO_ADMIN");
        var div_home = document.getElementById("div_home");
        if(document.getElementById("HOME_CALENDARIO_ADMIN")){
            div_home.removeChild(calendario);
        }
        

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

        // ESTADÍSTICAS ROLES USUARIO
        var miCanvas = document.createElement("canvas");
        miCanvas.setAttribute("id","MiGrafica");
        miCanvas.setAttribute("width","320");
        miCanvas.setAttribute("height","320");
        div.appendChild(miCanvas);

        fetch('/estadisticas-roles', {
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

            var USUARIOS_EMPRESARIOS = 0;
            var USUARIOS_TRABAJADORES = 0;
            var USUARIOS_OFERENTES = 0;

            for(i = 0 ; i < textoRespuesta.length ; i++){

                if(textoRespuesta[i].rol == 'empresario'){
                    USUARIOS_EMPRESARIOS++;
                }   

                if(textoRespuesta[i].rol == 'trabajador'){
                    USUARIOS_TRABAJADORES++;
                }

                if(textoRespuesta[i].rol == 'oferente'){
                    USUARIOS_OFERENTES++;
                }

            }

            let miCanvas   = document.getElementById("MiGrafica").getContext("2d");
            var chart = new Chart(miCanvas, {
                type:"doughnut",
                data:{
                    labels:[
                        "EMPRESARIOS",
                        "TRABAJADORES",
                        "OFERENTES",
                        ],

                    datasets:[
                        {
                            label:"Total de usuarios",
                            backgroundColor:[
                                "rgb(180,81,99)",
                                "rgb(86,28,146)",
                                "rgb(60,86,41)", 
                            ],
                            data:[
                                USUARIOS_EMPRESARIOS,
                                USUARIOS_TRABAJADORES,
                                USUARIOS_OFERENTES,
                                
                            ]
                        }
                    ]
                    
                },
                options: {
                    responsive: false
                }
            })

            
            var div = document.createElement("div");
            contenedor.appendChild(div);
            var empresario_img = document.createElement("img");
            empresario_img.setAttribute("src","./img/usuario_empresario.png");
            empresario_img.style.height = "180px";
            empresario_img.style.width = "180px";
            var texto = document.createElement("p");
            texto.innerHTML = USUARIOS_EMPRESARIOS;
            div.appendChild(empresario_img);
            div.appendChild(texto);

            var div = document.createElement("div");
            contenedor.appendChild(div);
            var trabajador_img = document.createElement("img");
            trabajador_img.setAttribute("src","./img/usuario_trabajador.png");
            trabajador_img.style.height = "180px";
            trabajador_img.style.width = "180px";
            var texto = document.createElement("p");
            texto.innerHTML = USUARIOS_TRABAJADORES;
            div.appendChild(trabajador_img);
            div.appendChild(texto);

            var div = document.createElement("div");
            contenedor.appendChild(div);
            var oferente_img = document.createElement("img");
            oferente_img.setAttribute("src","./img/usuario_oferente.png");
            oferente_img.style.height = "180px";
            oferente_img.style.width = "180px";
            var texto = document.createElement("p");
            texto.innerHTML = USUARIOS_OFERENTES;
            div.appendChild(oferente_img);
            div.appendChild(texto);
        })

        .catch(error => {
            console.error('Error al enviar los datos:' + error);
        });

        // ESTADISTICAS MÓDULOS

        var contenedor2 = document.createElement("div");
        contenedor2.setAttribute("id","HOME_CONFIGURACION_DIV");
        contenedor2.style.display = "flex",
        contenedor2.style.marginTop = "48px";
        contenedor2.style.justifyContent = "space-around";
        contenedor2.style.textAlign = "center";
        contenedor2.style.fontFamily = "monospace";
        contenedor2.style.fontSize = "20px";
        contenedor2.style.cursor = "pointer";
        CUERPO.appendChild(contenedor2);

        var div = document.createElement("div");
        contenedor2.appendChild(div);
        var miCanvas = document.createElement("canvas");
        miCanvas.setAttribute("id","Modulo-Color");
        miCanvas.setAttribute("width","200");
        miCanvas.setAttribute("height","200");
        var img = document.createElement("img");
        img.setAttribute("src","./img/icon/color.png");
        img.style.height = "80px";
        img.style.width = "80px";
        div.appendChild(img);
        div.appendChild(miCanvas);

        var div = document.createElement("div");
        contenedor2.appendChild(div);
        var miCanvas = document.createElement("canvas");
        miCanvas.setAttribute("id","Modulo-Chat");
        miCanvas.setAttribute("width","200");
        miCanvas.setAttribute("height","200");
        var img = document.createElement("img");
        img.setAttribute("src","./img/icon/chat.png");
        img.style.height = "80px";
        img.style.width = "80px";
        div.appendChild(img);
        div.appendChild(miCanvas);

        var div = document.createElement("div");
        contenedor2.appendChild(div);
        var miCanvas = document.createElement("canvas");
        miCanvas.setAttribute("id","Modulo-Calendario");
        miCanvas.setAttribute("width","200");
        miCanvas.setAttribute("height","200");
        var img = document.createElement("img");
        img.setAttribute("src","./img/icon/calendario.png");
        img.style.height = "80px";
        img.style.width = "80px";
        div.appendChild(img);
        div.appendChild(miCanvas);

        var div = document.createElement("div");
        contenedor2.appendChild(div);
        var miCanvas = document.createElement("canvas");
        miCanvas.setAttribute("id","Modulo-Horas");
        miCanvas.setAttribute("width","200");
        miCanvas.setAttribute("height","200");
        var img = document.createElement("img");
        img.setAttribute("src","./img/icon/hora.png");
        img.style.height = "80px";
        img.style.width = "80px";
        div.appendChild(img);
        div.appendChild(miCanvas);

        fetch('/estadisticas-modulos', {
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

            // MODULO HORAS
            var MOD_COLOR_SI = 0;
            var MOD_COLOR_NO = 0;
            var MOD_COLOR_INACTIVE = 0;

            for(i = 0 ; i < textoRespuesta.length ; i++){

                if(textoRespuesta[i].MOD_COLOR == 'SI'){
                    MOD_COLOR_SI++;
                }   

                if(textoRespuesta[i].MOD_COLOR == 'NO' || textoRespuesta[i].MOD_COLOR == null){
                    MOD_COLOR_NO++;
                }

                if(textoRespuesta[i].MOD_COLOR == 'INACTIVE'){
                    MOD_COLOR_INACTIVE++;
                }

            }

            let miCanvas   = document.getElementById("Modulo-Color").getContext("2d");
            var chart = new Chart(miCanvas, {
                type:"doughnut",
                data:{
                    labels:[
                        "SI",
                        "NO",
                        "INACTIVO",
                        ],

                    datasets:[
                        {
                            label:"Total de uso en Modulo Color",
                            backgroundColor:[
                                "rgb(96,172,121)",
                                "rgb(201,73,71)",
                                "rgb(71,138,201)", 
                            ],
                            data:[
                                MOD_COLOR_SI,
                                MOD_COLOR_NO,
                                MOD_COLOR_INACTIVE,
                                
                            ]
                        }
                    ]
                    
                },
                options: {
                    responsive: false
                }
            })

            // MODULO CHAT
            var MOD_CHAT_SI = 0;
            var MOD_CHAT_NO = 0;
            var MOD_CHAT_INACTIVE = 0;

            for(i = 0 ; i < textoRespuesta.length ; i++){

                if(textoRespuesta[i].MOD_CHAT == 'SI'){
                    MOD_CHAT_SI++;
                }   

                if(textoRespuesta[i].MOD_CHAT == 'NO' || textoRespuesta[i].MOD_CHAT == null){
                    MOD_CHAT_NO++;
                }

                if(textoRespuesta[i].MOD_CHAT == 'INACTIVE'){
                    MOD_CHAT_INACTIVE++;
                }

            }

            let miCanvasChat   = document.getElementById("Modulo-Chat").getContext("2d");
            var chart = new Chart(miCanvasChat, {
                type:"doughnut",
                data:{
                    labels:[
                        "SI",
                        "NO",
                        "INACTIVO",
                        ],

                    datasets:[
                        {
                            label:"Total de uso en Modulo Chat",
                            backgroundColor:[
                                "rgb(96,172,121)",
                                "rgb(201,73,71)",
                                "rgb(71,138,201)", 
                            ],
                            data:[
                                MOD_CHAT_SI,
                                MOD_CHAT_NO,
                                MOD_CHAT_INACTIVE,
                                
                            ]
                        }
                    ]
                    
                },
                options: {
                    responsive: false
                }
            })

             // MODULO CALENDARIO
             var MOD_CALENDARIO_SI = 0;
             var MOD_CALENDARIO_NO = 0;
             var MOD_CALENDARIO_INACTIVE = 0;
 
             for(i = 0 ; i < textoRespuesta.length ; i++){
 
                 if(textoRespuesta[i].MOD_CALENDARIO == 'SI'){
                     MOD_CALENDARIO_SI++;
                 }   
 
                 if(textoRespuesta[i].MOD_CALENDARIO == 'NO' || textoRespuesta[i].MOD_CALENDARIO == null){
                     MOD_CALENDARIO_NO++;
                 }
 
                 if(textoRespuesta[i].MOD_CALENDARIO == 'INACTIVE'){
                     MOD_CALENDARIO_INACTIVE++;
                 }
 
             }
 
             let miCanvasCalendario   = document.getElementById("Modulo-Calendario").getContext("2d");
             var chart = new Chart(miCanvasCalendario, {
                 type:"doughnut",
                 data:{
                     labels:[
                         "SI",
                         "NO",
                         "INACTIVO",
                         ],
 
                     datasets:[
                         {
                             label:"Total de uso en Modulo Calendario",
                             backgroundColor:[
                                 "rgb(96,172,121)",
                                 "rgb(201,73,71)",
                                 "rgb(71,138,201)", 
                             ],
                             data:[
                                 MOD_CALENDARIO_SI,
                                 MOD_CALENDARIO_NO,
                                 MOD_CALENDARIO_INACTIVE,
                                 
                             ]
                         }
                     ]
                     
                 },
                 options: {
                     responsive: false
                 }
             })


            // MODULO HORAS
            var MOD_HORAS_SI = 0;
            var MOD_HORAS_NO = 0;
            var MOD_HORAS_INACTIVE = 0;

            for(i = 0 ; i < textoRespuesta.length ; i++){

                if(textoRespuesta[i].MOD_HORA == 'SI'){
                    MOD_HORAS_SI++;
                }   

                if(textoRespuesta[i].MOD_HORA == 'NO' || textoRespuesta[i].MOD_HORA == null){
                    MOD_HORAS_NO++;
                }

                if(textoRespuesta[i].MOD_HORA == 'INACTIVE'){
                    MOD_HORAS_INACTIVE++;
                }

            }

            let miCanvasHoras   = document.getElementById("Modulo-Horas").getContext("2d");
            var chart = new Chart(miCanvasHoras, {
                type:"doughnut",
                data:{
                    labels:[
                        "SI",
                        "NO",
                        "INACTIVO",
                        ],

                    datasets:[
                        {
                            label:"Total de uso en Modulo Horas",
                            backgroundColor:[
                                "rgb(96,172,121)",
                                "rgb(201,73,71)",
                                "rgb(71,138,201)", 
                            ],
                            data:[
                                MOD_HORAS_SI,
                                MOD_HORAS_NO,
                                MOD_HORAS_INACTIVE,
                                
                            ]
                        }
                    ]
                    
                },
                options: {
                    responsive: false
                }
            })

            
            

        
    })

    .catch(error => {
        console.error('Error al enviar los datos:' + error);
    });

    })
