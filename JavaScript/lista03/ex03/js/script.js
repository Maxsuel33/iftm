btnDobrar = document.getElementById("btnDobro");
textValor = document.getElementById("txtTeste");
textDobro = document.getElementById("txtDobro");


btnDobrar.addEventListener("click", dobrarValor)


function dobrarValor() {
    if (textValor.value.trim() == "")
        alert("Voce não preencheu nada lenda!!!")

    else if (isNaN(textValor.value))
        alert("Um nmr irmão!!!")

    else {
    numero = (textValor.value);
    textDobro.value = (numero *2); 
    }  


}


