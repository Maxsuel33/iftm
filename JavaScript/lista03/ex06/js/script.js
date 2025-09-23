primeiroVal = document.getElementById("primeiroVal");
segundoVal = document.getElementById("segundoVal");
btnAdd = document.getElementById("add");
btnSub = document.getElementById("sub");
btnMulti = document.getElementById("mult");
btnDivi = document.getElementById("divi");
resultado = document.getElementById("resultado");


btnAdd.addEventListener("click", adicao);
btnSub.addEventListener("click", subtracao);
btnMulti.addEventListener("click", multiplicacao);
btnDivi.addEventListener("click", divisao);

function adicao() {
    n1 = primeiroVal.value.trim();
    n2 = segundoVal.value.trim();

    if (n1 === "" || n2 === "") {
        alert("Preencha os dois campos!");
        return;
    }

    if (isNaN(n1) || isNaN(n2)) {
        alert("Digite números válidos!");
        return;
    }

    resultado.value = parseFloat(n1) + parseFloat(n2);
}

function subtracao() {
    n1 = primeiroVal.value.trim();
    n2 = segundoVal.value.trim();

    if (n1 === "" || n2 === "") {
        alert("Preencha os dois campos!");
        return;
    }

    if (isNaN(n1) || isNaN(n2)) {
        alert("Digite números válidos!");
        return;
    }

    resultado.value = parseFloat(n1) - parseFloat(n2);
}
function multiplicacao() {
    n1 = primeiroVal.value.trim();
    n2 = segundoVal.value.trim();

    if (n1 === "" || n2 === "") {
        alert("Preencha os dois campos!");
        return;
    }

    if (isNaN(n1) || isNaN(n2)) {
        alert("Digite números válidos!");
        return;
    }

    resultado.value = parseFloat(n1) * parseFloat(n2);
}
function divisao() {

    n1 = parseFloat(primeiroVal.value);
    n2 = parseFloat(segundoVal.value);

    if (isNaN(n1) || isNaN(n2)) {
        alert("Digite números válidos.");
        return;
    }

    if (n2 === 0) {
        alert("Não é possível dividir por zero!");
        return;
    }

    resultado.value = n1 / n2;
}

