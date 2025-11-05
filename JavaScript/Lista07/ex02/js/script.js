const btnTransferir = document.getElementById("transferir");

    btnTransferir.addEventListener("click", function() {
      const caixa1 = document.getElementById("caixa1");
      const caixa2 = document.getElementById("caixa2");
      const segundos = document.getElementById("tempo").value; // valor selecionado

      btnTransferir.disabled = true;
      btnTransferir.textContent = `Aguardando ${segundos} segundos...`;

      // converte para milissegundos e aguarda
      setTimeout(() => {
        caixa2.value = caixa1.value; // move o texto
        caixa1.value = "";           // limpa a primeira caixa

        btnTransferir.disabled = false;
        btnTransferir.textContent = "Transferir texto";
      }, segundos * 1000);
      
    });