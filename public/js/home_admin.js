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
    // INICIO
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


    })
    