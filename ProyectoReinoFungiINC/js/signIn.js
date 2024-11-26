//Informacion para poder iniciar sesion
const VALID_USERNAME = "Azael";
const VALID_PASSWORD = "DDMI123";

//Verificacion
function handleLogin(event) {
    event.preventDefault();

    //Verificar que los datos sean los mismos o les llega fiscalia
    const username = document.getElementById("namefield").value.trim();
    const password = document.getElementById("passwordfield").value.trim();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        window.location.href = "Admin/Extra.html";
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.style.display = "block";
    }
}