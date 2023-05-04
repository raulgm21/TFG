window.onload = () => {

    document.getElementById("INICIO_registrarse").addEventListener("click", () => {
        window.location.href = '/registro';
    })

    document.getElementById("INICIO_iniciarsesion").addEventListener("click", () => {
        window.location.href = '/iniciarSesion';
    })

    
}