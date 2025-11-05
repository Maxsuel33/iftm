document.getElementById("transferir").addEventListener("click", function() {
      const nome = document.getElementById("nome").value.trim();
      const nomeExibido = document.getElementById("nomeExibido");

      if (nome === "") {
        alert("Por favor, digite seu nome completo!");
        return;
      }

      nomeExibido.textContent = nome;
      let tamanhoFonte = 14;
      nomeExibido.style.fontSize = tamanhoFonte + "px";

      // limpa qualquer intervalo anterior
      clearInterval(window.aumentarFonte);

      // cria o intervalo que aumenta o tamanho de 2 em 2 a cada 0,5 segundo
      window.aumentarFonte = setInterval(() => {
        tamanhoFonte += 2;
        nomeExibido.style.fontSize = tamanhoFonte + "px";

        if (tamanhoFonte >= 40) {
          clearInterval(window.aumentarFonte);
        }
      }, 500);
    });





