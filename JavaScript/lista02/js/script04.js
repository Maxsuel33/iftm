alert("A seguir informe o intervalo desejado para um sorteio")
n = parseInt(prompt("Digite um número desejado onde sera o valor Minimo sorteado: "));
m = parseInt(prompt("Digite um número desejado onde sera o valor maximo sorteado: "));
numRand = Math.floor(Math.random() * (m - n + 1)) + n;
document.write(numRand);