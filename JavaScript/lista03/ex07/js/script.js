login = document.getElementById("login");
senha = document.getElementById("senha");
confirmSenha = document.getElementById("confirmSenha");
btnEnviar = document.getElementById("entrar");
btnLimpar = document.getElementById("limpar");
form = document.getElementById("form");

btnEnviar.addEventListener("click", validarFormulario);
btnLimpar.addEventListener("click", limparForm);





function validarFormulario() {
    if (login.value.trim() == '') {
        alert("Digite um login válido");
        return form.reset();

    }

    if (senha.value !== confirmSenha.value) {
        alert("As senhas digitadas não são iguais! Por favor digite novamente!")
        return form.reset();

    }

    alert("Formulário enviado com sucesso!")




}


function limparForm() {
    form.reset();


}



