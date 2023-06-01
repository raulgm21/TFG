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
    // ESTADISTICAS
    // ---------------------------------------------------------------------- //

    document.getElementById("HOME_ESTADISTICAS").addEventListener("click", () => {

        vaciar_cuerpo(CUERPO);

        var titulo = document.createElement("h1");
        titulo.setAttribute("id", "HOME_cuerpo_titulo");
        titulo.innerHTML = "¡Estadísticas!";
        CUERPO.appendChild(titulo);

        var texto = document.createElement("p");
        texto.setAttribute("id","HOME_cuerpo_texto_nombre");
        texto.innerHTML = "Aquí se puede comprobar todos los tipos de usuarios registrados en la aplicación, y de la viabilidad de los módulos.";
        CUERPO.appendChild(texto);

        var calendario = document.getElementById("HOME_CALENDARIO_ADMIN");
        var div_home = document.getElementById("div_home");
        div_home.removeChild(calendario);

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
    // ---------------------------------------------------------------------- //
    // GRAFICA
    // ---------------------------------------------------------------------- //
