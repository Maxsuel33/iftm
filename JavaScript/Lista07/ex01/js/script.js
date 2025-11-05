const btnTransferir = document.getElementById("transferir");

    btnTransferir.addEventListener("click", function() {
      const caixa1 = document.getElementById("caixa1");
      const caixa2 = document.getElementById("caixa2");

      // desativa o botão enquanto espera
      btnTransferir.disabled = true;
      btnTransferir.textContent = "Aguardando...";

      setTimeout(() => {
        caixa2.value = caixa1.value;
        caixa1.value = "";            

        // faz o botão a voltar a funcionalidade anterior
        btnTransferir.disabled = false;
        btnTransferir.textContent = "Transferir texto";
      }, 2000);
    });
