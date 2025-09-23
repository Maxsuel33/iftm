text = document.getElementById("txtTeste");
btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", mostrarMaiusculo);

function mostrarMaiusculo() {
    alert(text.value.toUpperCase());
}




