window.onload = () => {

    var BODY = document.querySelector("body");

    document.getElementById("REGISTRO_ATRAS").addEventListener("click", () => { window.location.href = '/' })
    // --- Empresario
    document.getElementById("REGISTRO_registrar_empresario").addEventListener("click", registro_empresario);
    document.getElementById("REGISTRO_boton_empresario").addEventListener("click", registro_empresario);

    // --- Trabajador
    document.getElementById("REGISTRO_registrar_trabajador").addEventListener("click", registro_trabajador);
    document.getElementById("REGISTRO_boton_trabajador").addEventListener("click", registro_trabajador);

    // --- Oferente
    document.getElementById("REGISTRO_registrar_oferente").addEventListener("click", registro_oferente);
    document.getElementById("REGISTRO_boton_oferente").addEventListener("click", registro_oferente);
    

    function registro_empresario(){ window.location.href = '/registro/empresario' } 
    function registro_trabajador(){ window.location.href = '/registro/trabajador' } 
    function registro_oferente(){ window.location.href = '/registro/oferente' } 
   
}

