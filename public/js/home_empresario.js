window.onload = () => {

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

    document.getElementById("HOME_tutorial_no").addEventListener("click", () => {
        alert("holi");
        var DNI = document.getElementById("HOME_DNI_USUARIO").value;
        alert(DNI);
    })

    
}