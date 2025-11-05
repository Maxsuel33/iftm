document.getElementById("iniciar").addEventListener("click", function() {
      const qtd = parseInt(document.getElementById("quantidade").value);
      const container = document.getElementById("nomesExibidos");
      container.innerHTML = ""; // limpa resultados anteriores

      if (isNaN(qtd) || qtd <= 0) {
        alert("Por favor, informe um número válido de nomes!");
        return;
      }

      let nomes = [];

      // solicita os nomes ao usuário
      for (let i = 0; i < qtd; i++) {
        let nome = prompt(`Digite o ${i + 1}º nome:`);
        if (nome) 
            nomes.push(nome);
      }

      // exibe um nome por segundo
      let i = 0;
      const intervalo = setInterval(() => {
        if (i < nomes.length) {
          const p = document.createElement("p");
          p.textContent = nomes[i];
          container.appendChild(p);
          i++;
        } else {
          clearInterval(intervalo);
        }
      }, 1000);
    });