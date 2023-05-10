window.onload = () => {

    document.getElementById("INICIO_registrarse").addEventListener("click", () => {
        window.location.href = '/registro';
    })

    document.getElementById("INICIO_iniciarsesion").addEventListener("click", () => {
        window.location.href = '/iniciarSesion';
    })

    document.getElementById("INICIO_terminosCondiciones").addEventListener("click", () => {
        window.location.href = '/terminos-condiciones';
    })

    document.getElementById("INICIO_privacidadDatos").addEventListener("click", () => {
        window.location.href = '/privacidad-datos';
    })

    document.getElementById("INICIO_avisoLegal").addEventListener("click", () => {
        window.location.href = '/aviso-legal';
    })

    document.getElementById("INICIO_politicaCookies").addEventListener("click", () => {
        window.location.href = '/politica-cookies';
    })

    document.getElementById("INICIO_contactanos").addEventListener("click", () => {
        window.location.href = '/contacto';
    })

    
}