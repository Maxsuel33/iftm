    document.getElementById("iniciar").addEventListener("click", function() {
      let segundos = parseInt(document.getElementById("tempo").value);
      const msg = document.getElementById("mensagem");


      if (isNaN(segundos) || segundos <= 0) {
        alert("Por favor, informe um número válido de segundos!");
        return;
      }

      // Exibe a primeira mensagem
      msg.textContent = `Por favor, aguarde ${segundos} segundos para carregar a página do Google`;

      // Atualiza a contagem a cada segundo
      const contador = setInterval(() => {
        segundos--;
        if (segundos > 0) {
          msg.textContent = `Por favor, aguarde ${segundos} segundos para carregar a página do Google`;
        } else {
          clearInterval(contador);
          msg.textContent = "Redirecionando...";
          window.location.href = "https://www.google.com";
        }
      }, 1000);

      
    });