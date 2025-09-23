primeiroBim = document.getElementById("primeiroBim");
segundoBim = document.getElementById("segundoBim");
btnResultado = document.getElementById("resultado");

btnResultado.addEventListener("click", calcularNotas);

function calcularNotas() {  

    resultado = parseFloat(primeiroBim.value) + parseFloat(segundoBim.value);

    if (resultado >= 60)
    alert(`Sua nota foi: ${resultado}`);

    else
    alert(`Sua nota foi: ${resultado}`);

}
