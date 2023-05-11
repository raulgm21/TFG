window.onlodad = () => {

    let correo                  = document.getElementById("correo_contacto").value;
    let asunto                  = document.getElementById("asunto_contacto").value;
    let descripcion             = document.getElementById("descripcion_contacto").value;

    var labelCorreo             = document.getElementById("label_correo_contacto");
    var labelAsunto             = document.getElementById("label_asunto_contacto");
    var labelDescripcion        = document.getElementById("label_descripcion_contacto");

    let inputCorreo             = document.getElementById("correo_contacto");
    let inputAsunto             = document.getElementById("asunto_contacto");
    let inputDescripcion        = document.getElementById("descripcion_contacto");


    if(correo.lenght != 0 && asunto.lenght != 0 && descripcion.lenght != 0){

        if(correo.lenght!= 0){
            labelCorreo.style.color      = "green";
            labelCorreo.style.fontWeight = "green";
        }

        if(asunto.lenght != 0){
            labelAsunto.style.color      = "green";
            labelAsunto.style.fontWeight = "green";
        }

        if(descripcion.lenght != 0){
            labelDescripcion.style.color      = "green";
            labelDescripcion.style.fontWeight = "green";
        }

        alert("Correo Enviado");

    }else{

        if(correo.lenght == 0){
            labelCorreo.style.color      = "red";
            labelCorreo.style.fontWeight = "red";
        }

        if(asunto.lenght == 0){
            labelAsunto.style.color      = "red";
            labelAsunto.style.fontWeight = "red";
        }

        if(descripcion.lenght == 0){
            labelDescripcion.style.color      = "red";
            labelDescripcion.style.fontWeight = "red";
        }

    }
    
   

}