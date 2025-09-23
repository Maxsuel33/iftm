texto = document.getElementById("txtTeste");
btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", enviar);

function enviar() {
    alert(texto.value);
    
}
