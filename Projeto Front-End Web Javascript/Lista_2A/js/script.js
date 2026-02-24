const idades = [12, 18, 25, 30, 15, 22, 40, 17, 19];

        document.getElementById("btnCalcular").addEventListener("click", () => {

            const valor = Number(document.getElementById("valorMinimo").value);

            // a) Soma das idades
            const soma = idades.reduce((total, idade) => total + idade, 0);

            // b) Média
            const media = soma / idades.length;

            // c) Maior idade
            const maior = idades.reduce((max, idade) => idade > max ? idade : max);

            // d) Idades ímpares
            const impares = idades.filter(idade => idade % 2 !== 0);

            // e) Todos maiores de 18
            const maiores18 = idades.every(idade => idade >= 18);

            // f) Todos maiores que valor informado
            const todosMaiorValor = idades.every(idade => idade >= valor);

            // g) Idades >= valor informado
            const maioresQueValor = idades.filter(idade => idade >= valor);

            // h) Média das idades >= valor
            const somaMaiores = maioresQueValor.reduce((t, i) => t + i, 0);

            const mediaMaiores = maioresQueValor.length > 0
                ? somaMaiores / maioresQueValor.length
                : 0;

            // Exibição

            document.getElementById("soma").textContent =
                "a) Soma das idades: " + soma;

            document.getElementById("media").textContent =
                "b) Média das idades: " + media.toFixed(2);

            document.getElementById("maior").textContent =
                "c) Maior idade: " + maior;

            document.getElementById("impares").textContent =
                "d) Idades ímpares: " + impares.join(", ");

            document.getElementById("maiores18").textContent =
                "e) Todos são maiores de 18? " + maiores18;

            document.getElementById("todosMaiorValor").textContent =
                "f) Todos são >= " + valor + "? " + todosMaiorValor;

            document.getElementById("maioresQueValor").textContent =
                "g) Idades >= " + valor + ": " + maioresQueValor.join(", ");

            document.getElementById("mediaMaiores").textContent =
                "h) Média das idades >= " + valor + ": " + mediaMaiores.toFixed(2);

        });