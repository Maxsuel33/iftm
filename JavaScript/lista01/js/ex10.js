num = prompt("Digite um número positivo:");
nome = prompt("Digite seu nome completo: ", "Maxsuel Silva Teles");

if (num > 0) 
    for (i = 0; i < num; i++)
        document.write(`<p>${nome}</p>`)

else 
    alert("O número digitado é negativo ou nulo.")